/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 *
 * Renders an AG Grid page showing all open PO lines. Editable cells
 * (Quantity, Unit Cost, Expected Receipt, Memo) call the companion RESTlet
 * on cell blur and write back to NetSuite automatically.
 *
 * Script ID:     customscript_po_grid_editor_sl
 * Deployment ID: customdeploy_po_grid_editor_sl
 */
define(['N/search', 'N/url', 'N/log'], (search, url, log) => {

  // PO statuses considered "open" — Pending Receipt + Partially Received
  const OPEN_PO_STATUSES = ['PurchOrd:B', 'PurchOrd:D'];

  const onRequest = (context) => {
    if (context.request.method !== 'GET') {
      context.response.setHeader({ name: 'Content-Type', value: 'text/plain' });
      context.response.write('Method not allowed');
      return;
    }

    const lines = getOpenPOLines();

    const restletUrl = url.resolveScript({
      scriptId:     'customscript_po_grid_save_rl',
      deploymentId: 'customdeploy_po_grid_save_rl',
      returnExternalUrl: false
    });

    context.response.setHeader({ name: 'Content-Type', value: 'text/html; charset=utf-8' });
    context.response.write(buildPage(lines, restletUrl));
  };

  function getOpenPOLines() {
    const results = [];

    search.create({
      type: search.Type.PURCHASE_ORDER,
      filters: [
        ['status',   search.Operator.ANYOF, OPEN_PO_STATUSES], 'AND',
        ['mainline', search.Operator.IS,    'F'],  // line-level rows only
        'AND',
        ['taxline',  search.Operator.IS,    'F'],  // exclude tax lines
        'AND',
        ['cogs',     search.Operator.IS,    'F']   // exclude COGS lines
      ],
      columns: [
        search.createColumn({ name: 'internalid' }),
        search.createColumn({ name: 'tranid' }),
        search.createColumn({ name: 'entity' }),
        search.createColumn({ name: 'trandate' }),
        search.createColumn({ name: 'line' }),
        search.createColumn({ name: 'item' }),
        search.createColumn({ name: 'quantity' }),
        search.createColumn({ name: 'rate' }),
        search.createColumn({ name: 'amount' }),
        search.createColumn({ name: 'expectedreceiptdate' }),
        search.createColumn({ name: 'memo' })
      ]
    }).run().each((result) => {
      results.push({
        poId:                String(result.getValue('internalid')),
        poNumber:            result.getValue('tranid')            || '',
        vendor:              result.getText('entity')             || '',
        date:                result.getValue('trandate')          || '',
        lineIndex:           result.getValue('line'),             // raw search value; RESTlet converts to 0-based
        item:                result.getText('item')               || result.getValue('item') || '',
        quantity:            parseFloat(result.getValue('quantity'))            || 0,
        rate:                parseFloat(result.getValue('rate'))                || 0,
        amount:              parseFloat(result.getValue('amount'))              || 0,
        expectedreceiptdate: result.getValue('expectedreceiptdate')             || '',
        memo:                result.getValue('memo')              || ''
      });
      return true; // continue iteration
    });

    log.debug({ title: 'PO Grid: lines loaded', details: results.length });
    return results;
  }

  function buildPage(lines, restletUrl) {
    const jsonLines   = JSON.stringify(lines);
    const jsonRestlet = JSON.stringify(restletUrl);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PO Line Grid Editor</title>

  <!-- AG Grid Community — for production move these to the NetSuite File Cabinet -->
  <script src="https://cdn.jsdelivr.net/npm/ag-grid-community@31.3.4/dist/ag-grid-community.min.noStyle.js"></script>
  <link  rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community@31.3.4/styles/ag-grid.css">
  <link  rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community@31.3.4/styles/ag-theme-quartz.css">

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f4f6f8;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .header {
      background: #1a3a5c;
      color: #fff;
      padding: 10px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .header h1 { font-size: 17px; font-weight: 600; }

    .toolbar {
      background: #fff;
      border-bottom: 1px solid #ddd;
      padding: 8px 18px;
      display: flex;
      align-items: center;
      gap: 14px;
      flex-shrink: 0;
      min-height: 42px;
    }

    .status-pill {
      font-size: 12px;
      font-weight: 500;
      padding: 3px 10px;
      border-radius: 12px;
      transition: background 0.2s, color 0.2s;
    }
    .status-pill.idle    { background: #e8f5e9; color: #2e7d32; }
    .status-pill.saving  { background: #fff3e0; color: #e65100; }
    .status-pill.error   { background: #fce4ec; color: #c62828; }

    .row-count { font-size: 12px; color: #777; }

    .hint {
      margin-left: auto;
      font-size: 11px;
      color: #aaa;
    }

    /* Yellow tint on editable columns */
    .editable-cell { background-color: #fffde7 !important; }

    .grid-wrapper {
      flex: 1;
      padding: 12px 18px 16px;
      min-height: 0;
    }
    #myGrid { height: 100%; width: 100%; }
  </style>
</head>
<body>

<div class="header">
  <h1>Purchase Order Line Editor</h1>
</div>

<div class="toolbar">
  <span id="statusPill" class="status-pill idle">All changes saved</span>
  <span id="rowCount"   class="row-count"></span>
  <span class="hint">Yellow cells are editable — click to edit, changes save on leaving the cell.</span>
</div>

<div class="grid-wrapper">
  <div id="myGrid" class="ag-theme-quartz"></div>
</div>

<script>
(function () {
  'use strict';

  const ROW_DATA    = ${jsonLines};
  const RESTLET_URL = ${jsonRestlet};

  // ── Status bar helpers ────────────────────────────────────────────────────
  let pendingSaves = 0;

  function setStatus(state, message) {
    const pill = document.getElementById('statusPill');
    pill.className = 'status-pill ' + state;
    pill.textContent = message;
  }

  // ── Cell-level save ───────────────────────────────────────────────────────
  function onCellValueChanged(params) {
    const { data, colDef, newValue, oldValue, node } = params;
    const fieldId = colDef.field;

    if (newValue === oldValue || newValue === undefined || newValue === null) return;

    pendingSaves++;
    setStatus('saving', 'Saving…');

    fetch(RESTLET_URL, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        poId:      data.poId,
        lineIndex: Number(data.lineIndex),
        fieldId:   fieldId,
        value:     newValue
      })
    })
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(json => {
      pendingSaves = Math.max(0, pendingSaves - 1);

      if (json.success) {
        if (pendingSaves === 0) setStatus('idle', 'All changes saved');

        // Recalculate line total client-side so the Amount column stays in sync
        if (fieldId === 'quantity' || fieldId === 'rate') {
          const qty  = fieldId === 'quantity' ? parseFloat(newValue) : parseFloat(data.quantity);
          const rate = fieldId === 'rate'     ? parseFloat(newValue) : parseFloat(data.rate);
          node.setDataValue('amount', parseFloat((qty * rate).toFixed(2)));
        }
      } else {
        pendingSaves === 0 && setStatus('error', 'Save failed — see browser console');
        console.error('[PO Grid] Save rejected by server:', json.error);
        node.setDataValue(fieldId, oldValue); // roll back
      }
    })
    .catch(err => {
      pendingSaves = Math.max(0, pendingSaves - 1);
      setStatus('error', 'Network error — change rolled back');
      console.error('[PO Grid] Network error:', err);
      node.setDataValue(fieldId, oldValue); // roll back
    });
  }

  // ── Formatters ────────────────────────────────────────────────────────────
  const usdFormatter = p =>
    p.value == null ? '' :
    '$' + parseFloat(p.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // ── Column definitions ────────────────────────────────────────────────────
  const editableStyle = () => ({ 'background-color': '#fffde7' });

  const columnDefs = [
    {
      field: 'poNumber', headerName: 'PO #', width: 110, pinned: 'left',
      cellStyle: { fontWeight: '600' }
    },
    { field: 'vendor', headerName: 'Vendor', width: 190, pinned: 'left' },
    { field: 'date',   headerName: 'PO Date', width: 105 },
    { field: 'item',   headerName: 'Item', flex: 1, minWidth: 200 },
    {
      field: 'quantity', headerName: 'Quantity', width: 110,
      editable: true, type: 'numericColumn',
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: { min: 0, precision: 4 },
      cellStyle: editableStyle
    },
    {
      field: 'rate', headerName: 'Unit Cost', width: 120,
      editable: true, type: 'numericColumn',
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: { min: 0, precision: 4 },
      valueFormatter: usdFormatter,
      cellStyle: editableStyle
    },
    {
      field: 'amount', headerName: 'Line Total', width: 120,
      type: 'numericColumn', valueFormatter: usdFormatter,
      cellStyle: { color: '#555' }
    },
    {
      field: 'expectedreceiptdate', headerName: 'Expected Receipt', width: 150,
      editable: true,
      cellEditor: 'agDateStringCellEditor',
      cellStyle: editableStyle
    },
    {
      field: 'memo', headerName: 'Memo / Note', flex: 1, minWidth: 180,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellStyle: editableStyle
    }
  ];

  // ── Unique PO IDs for alternating row shading ─────────────────────────────
  const uniquePoIds = [...new Set(ROW_DATA.map(r => r.poId))];

  // ── Grid init ─────────────────────────────────────────────────────────────
  agGrid.createGrid(document.getElementById('myGrid'), {
    columnDefs,
    rowData: ROW_DATA,
    defaultColDef: {
      sortable:   true,
      resizable:  true,
      filter:     true,
      floatingFilter: true
    },
    onCellValueChanged,
    onGridReady() {
      const poCount   = uniquePoIds.length;
      const lineCount = ROW_DATA.length;
      document.getElementById('rowCount').textContent =
        lineCount + ' line' + (lineCount !== 1 ? 's' : '') +
        ' across ' + poCount + ' PO' + (poCount !== 1 ? 's' : '');
    },
    getRowStyle(params) {
      // Alternate background per PO block for visual grouping
      return uniquePoIds.indexOf(params.data.poId) % 2 !== 0
        ? { background: '#f9f9f9' }
        : null;
    }
  });

}());
</script>
</body>
</html>`;
  }

  return { onRequest };
});
