export default function ConnectorsGuide({ onNext, onBack }) {

  const Step = ({ num, title, children }) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 6 }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
          backgroundColor: '#253746', color: '#ffc56e',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13,
        }}>{num}</div>
        <p style={{ fontWeight: 700, color: '#253746', fontSize: 14, paddingTop: 4 }}>{title}</p>
      </div>
      <div style={{ marginLeft: 38 }}>
        {children}
      </div>
    </div>
  );

  const Screenshot = ({ src, alt }) => (
    <div style={{ marginTop: 14, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(37,55,70,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f2e8da' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 48px' }}>

        <div style={{ marginBottom: 28 }}>
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#f2e8da', backgroundColor: '#253746',
            padding: '3px 10px', borderRadius: 2, marginBottom: 12,
            fontFamily: "'Barlow Condensed', sans-serif",
          }}>
            Bonus: Quick Reference
          </span>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: '#253746', fontSize: 28, fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.5px', marginBottom: 8,
          }}>
            Managing Connectors 🔌
          </h2>
          <p style={{ color: 'rgba(37,55,70,0.7)', fontSize: 14.5, lineHeight: 1.65 }}>
            Connectors let Claude access tools like Gmail, Google Drive, or Calendar. You control which ones are active — and you can switch them on or off for each conversation independently.
          </p>
        </div>

        {/* Section 1: Turn on/off */}
        <div style={{ background: 'white', borderRadius: 6, border: '1px solid rgba(37,55,70,0.09)', padding: '18px', marginBottom: 16 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, color: '#253746', marginBottom: 16, letterSpacing: '0.02em' }}>
            How to turn a connector on or off
          </p>

          <Step num={1} title='Click the "+" button at the bottom-left of the chat input'>
            <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.7)', lineHeight: 1.6 }}>
              You'll find it next to the message box in any Claude conversation.
            </p>
          </Step>

          <Step num={2} title='Select "Connectors" from the menu'>
            <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.7)', lineHeight: 1.6 }}>
              A panel opens showing all your available connectors.
            </p>
          </Step>

          <Step num={3} title="Toggle any connector on or off">
            <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.7)', lineHeight: 1.6 }}>
              Click the toggle next to any connector. Changes take effect immediately — you can do this mid-conversation.
            </p>
          </Step>

          <Screenshot src="/connectors-menu.png" alt="Claude connectors menu showing toggle switches" />
        </div>

        {/* Section 2: Different connectors per task */}
        <div style={{ background: 'white', borderRadius: 6, border: '1px solid rgba(37,55,70,0.09)', padding: '18px', marginBottom: 16 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, color: '#253746', marginBottom: 12, letterSpacing: '0.02em' }}>
            Different connectors for different tasks?
          </p>
          <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.7)', lineHeight: 1.65, marginBottom: 12 }}>
            Connectors are set <strong>per conversation</strong>. The simplest solution: use separate chats for tasks that need different connectors.
          </p>
          <div style={{ marginTop: 4, borderLeft: '3px solid #79dbd4', backgroundColor: 'rgba(121,219,212,0.07)', padding: '10px 12px', borderRadius: '0 4px 4px 0' }}>
            <p style={{ fontSize: 13, color: '#253746', lineHeight: 1.6 }}>
              <strong>Why keep them separate?</strong> Any connector you leave on gets used by Claude automatically — even when you didn't ask. Starting a clean conversation keeps Claude focused and avoids unexpected file reads eating into your token budget.
            </p>
          </div>
        </div>

        {/* Section 3: Auto vs On Demand */}
        <div style={{ background: 'white', borderRadius: 6, border: '1px solid rgba(37,55,70,0.09)', padding: '18px', marginBottom: 20 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, color: '#253746', marginBottom: 12, letterSpacing: '0.02em' }}>
            Auto vs. "Load tools when needed"
          </p>
          <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.7)', lineHeight: 1.65, marginBottom: 12 }}>
            At the bottom of the Connectors panel you'll see a <strong>Tool access</strong> option with two modes:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 4 }}>
            {[
              {
                label: 'Auto (default)',
                color: '#4e5a31',
                desc: 'Claude decides when to use a connector. Good for most tasks — it will pull in Gmail or Drive when it thinks it helps.',
              },
              {
                label: 'Load tools when needed',
                color: '#884933',
                desc: 'Claude only uses a connector when you explicitly ask (e.g., "Check my Gmail for the latest reply from Target"). Best when you have several connectors on and want to stay in control.',
              },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  flexShrink: 0, marginTop: 2, padding: '2px 8px', borderRadius: 2, fontSize: 10,
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
                  backgroundColor: item.color, color: '#f2e8da',
                }}>{item.label}</span>
                <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.75)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <Screenshot src="/connectors-tool-access.png" alt="Claude Tool access submenu showing Load tools when needed option" />
        </div>

        {/* Token reminder */}
        <div style={{
          borderLeft: '3px solid #884933', backgroundColor: 'rgba(136,73,51,0.06)',
          padding: '14px 16px', marginBottom: 28, borderRadius: '0 4px 4px 0',
        }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, color: '#884933', marginBottom: 5 }}>
            ⚠️ Remember the token cost
          </p>
          <p style={{ color: 'rgba(37,55,70,0.75)', fontSize: 14, lineHeight: 1.65 }}>
            Leaving a connector on doesn't automatically drain tokens — but <strong>if Claude uses it, it reads content from that source</strong>. A Gmail scan of 50 emails costs ~17,500 tokens before Claude writes a word back. Turn connectors off when you don't need them.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onBack}
            className="transition-all hover:opacity-80 active:scale-95"
            style={{
              padding: '11px 20px', borderRadius: 4, cursor: 'pointer',
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.06em',
              backgroundColor: 'transparent', color: '#253746', border: '2px solid rgba(37,55,70,0.2)',
            }}
          >
            ← BACK
          </button>
          <button
            onClick={onNext}
            className="transition-all hover:opacity-90 active:scale-95"
            style={{
              flex: 1, padding: '11px 20px', borderRadius: 4, border: 'none', cursor: 'pointer',
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.06em',
              backgroundColor: '#253746', color: '#f2e8da',
            }}
          >
            NEXT: QUICK QUIZ →
          </button>
        </div>
      </div>
    </div>
  );
}
