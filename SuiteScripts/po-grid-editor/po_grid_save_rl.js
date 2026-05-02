/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 *
 * Accepts a PUT request from the PO Grid Editor Suitelet and writes
 * a single field value on a specific PO line.
 *
 * Expected request body (JSON):
 *   {
 *     poId:      string   — internal ID of the Purchase Order
 *     lineIndex: number   — raw 'line' value from N/search (1-based; converted here)
 *     fieldId:   string   — sublist field to update (must be in ALLOWED_FIELDS)
 *     value:     any      — new value
 *   }
 *
 * Returns:
 *   { success: true,  savedId: number }
 *   { success: false, error:   string }
 *
 * Script ID:     customscript_po_grid_save_rl
 * Deployment ID: customdeploy_po_grid_save_rl
 */
define(['N/record', 'N/format', 'N/log'], (record, format, log) => {

  const SUBLIST = 'item';

  // Only these fields may be written via this endpoint
  const ALLOWED_FIELDS = new Set([
    'quantity',
    'rate',
    'expectedreceiptdate',
    'memo'
  ]);

  const put = (body) => {
    const { poId, lineIndex, fieldId, value } = body;

    // ── Input validation ──────────────────────────────────────────────────
    if (!poId)            return err('Missing required field: poId');
    if (lineIndex == null) return err('Missing required field: lineIndex');
    if (!fieldId)         return err('Missing required field: fieldId');
    if (!ALLOWED_FIELDS.has(fieldId))
      return err(`Field "${fieldId}" is not editable via this interface`);

    // ── Type coercion ─────────────────────────────────────────────────────
    let coercedValue;
    try {
      coercedValue = coerce(fieldId, value);
    } catch (e) {
      return err(e.message);
    }

    // ── Record update ─────────────────────────────────────────────────────
    try {
      const rec = record.load({
        type: record.Type.PURCHASE_ORDER,
        id:   poId,
        isDynamic: true
      });

      const lineCount = rec.getLineCount({ sublistId: SUBLIST });

      // N/search returns 'line' as a 1-based integer string; selectLine is 0-based
      const zeroBasedLine = parseInt(lineIndex, 10) - 1;

      if (zeroBasedLine < 0 || zeroBasedLine >= lineCount) {
        return err(
          `Line index ${lineIndex} is out of range (PO has ${lineCount} line(s)). ` +
          `If lines seem off by one, check whether your NetSuite version returns ` +
          `0-based or 1-based values from the search 'line' column.`
        );
      }

      rec.selectLine({ sublistId: SUBLIST, line: zeroBasedLine });
      rec.setCurrentSublistValue({ sublistId: SUBLIST, fieldId, value: coercedValue });
      rec.commitLine({ sublistId: SUBLIST });

      const savedId = rec.save({ enableSourcing: true, ignoreMandatoryFields: false });

      log.audit({
        title:   'PO Grid Save',
        details: `PO ${poId} | line ${lineIndex} | ${fieldId} = "${coercedValue}" → saved as ID ${savedId}`
      });

      return { success: true, savedId };

    } catch (e) {
      log.error({
        title:   'PO Grid Save Error',
        details: `poId=${poId} lineIndex=${lineIndex} fieldId=${fieldId} — ${e.message}`
      });
      return err(e.message);
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────

  function coerce(fieldId, value) {
    switch (fieldId) {
      case 'quantity':
      case 'rate': {
        const n = parseFloat(value);
        if (isNaN(n) || n < 0)
          throw new Error(`Invalid value "${value}" for numeric field "${fieldId}"`);
        return n;
      }
      case 'expectedreceiptdate': {
        if (!value) return null;
        // Accept ISO strings (YYYY-MM-DD) or any string parseable by Date
        const d = new Date(value);
        if (isNaN(d.getTime()))
          throw new Error(`Cannot parse "${value}" as a date`);
        return format.parse({ value: value, type: format.Type.DATE });
      }
      case 'memo':
        return String(value ?? '');
      default:
        return value;
    }
  }

  function err(message) {
    return { success: false, error: message };
  }

  return { put };
});
