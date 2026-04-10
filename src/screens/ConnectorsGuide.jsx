export default function ConnectorsGuide({ onNext, onBack }) {

  const Step = ({ num, title, children, mockup }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
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
        {mockup && (
          <div style={{ marginTop: 10, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(37,55,70,0.12)' }}>
            {mockup}
          </div>
        )}
      </div>
    </div>
  );

  // Mockup: chat input bar with + button
  const InputBarMockup = () => (
    <div style={{ backgroundColor: '#1a1a2e', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%',
        backgroundColor: '#ffc56e', boxShadow: '0 0 0 4px rgba(255,197,110,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        fontWeight: 900, fontSize: 18, color: '#253746', cursor: 'pointer',
      }}>+</div>
      <div style={{
        flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8,
        padding: '8px 12px', fontSize: 12, color: 'rgba(255,255,255,0.35)',
      }}>
        Message Claude…
      </div>
      <div style={{ fontSize: 10, color: '#ffc56e', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: '0.05em' }}>
        ← TAP HERE
      </div>
    </div>
  );

  // Mockup: the popup menu with Connectors highlighted
  const MenuMockup = () => (
    <div style={{ backgroundColor: '#2a2a3e', padding: '6px 0' }}>
      {[
        { icon: '🔍', label: 'Web search', active: false },
        { icon: '📎', label: 'Attach files', active: false },
        { icon: '🔌', label: 'Connectors', active: true, arrow: true },
      ].map((item, i) => (
        <div key={i} style={{
          padding: '9px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: item.active ? 'rgba(255,197,110,0.15)' : 'transparent',
          borderLeft: item.active ? '3px solid #ffc56e' : '3px solid transparent',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: item.active ? '#ffc56e' : 'rgba(255,255,255,0.65)' }}>{item.label}</span>
          </div>
          {item.arrow && <span style={{ color: '#ffc56e', fontSize: 12 }}>▶</span>}
        </div>
      ))}
    </div>
  );

  // Mockup: connector toggle list
  const ToggleMockup = ({ gmailOn, driveOn }) => (
    <div style={{ backgroundColor: '#2a2a3e', padding: '8px 0' }}>
      <div style={{ padding: '6px 14px 8px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 4 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}>Active for this conversation</span>
      </div>
      {[
        { icon: '📧', label: 'Gmail', on: gmailOn },
        { icon: '📁', label: 'Google Drive', on: driveOn },
        { icon: '📅', label: 'Google Calendar', on: false },
      ].map((item, i) => (
        <div key={i} style={{ padding: '9px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: item.on ? '#f2e8da' : 'rgba(255,255,255,0.4)' }}>{item.label}</span>
          </div>
          <div style={{
            width: 36, height: 20, borderRadius: 10, position: 'relative', cursor: 'pointer',
            backgroundColor: item.on ? '#79dbd4' : 'rgba(255,255,255,0.15)',
            transition: 'background-color 0.2s',
          }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%', backgroundColor: 'white',
              position: 'absolute', top: 3,
              left: item.on ? 19 : 3,
              transition: 'left 0.2s',
            }} />
          </div>
        </div>
      ))}
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

          <Step num={1} title='Click the "+" button at the bottom-left of the chat input'
            mockup={<InputBarMockup />}
          >
            <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.7)', lineHeight: 1.6 }}>
              You'll see this button next to the message box in any Claude conversation. It opens a quick-action menu.
            </p>
          </Step>

          <Step num={2} title='Select "Connectors" from the menu'
            mockup={<MenuMockup />}
          >
            <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.7)', lineHeight: 1.6 }}>
              A small popup appears with options including web search, file uploads, and Connectors. Click Connectors to expand it.
            </p>
          </Step>

          <Step num={3} title="Toggle any connector on or off"
            mockup={<ToggleMockup gmailOn={true} driveOn={false} />}
          >
            <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.7)', lineHeight: 1.6 }}>
              Each connector has a toggle switch. <strong>Teal = on</strong>, grey = off. Changes take effect immediately — you can do this mid-conversation too.
            </p>
          </Step>
        </div>

        {/* Section 2: Different connectors per task */}
        <div style={{ background: 'white', borderRadius: 6, border: '1px solid rgba(37,55,70,0.09)', padding: '18px', marginBottom: 16 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, color: '#253746', marginBottom: 12, letterSpacing: '0.02em' }}>
            Different connectors for different tasks?
          </p>
          <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.7)', lineHeight: 1.65, marginBottom: 14 }}>
            Connectors are set <strong>per conversation</strong>. The simplest solution: use separate chats for tasks that need different connectors.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(37,55,70,0.09)' }}>
              <div style={{ padding: '8px 12px', backgroundColor: '#4e5a31' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 800, color: '#f2e8da', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Conversation A</p>
                <p style={{ fontSize: 12, color: 'rgba(242,232,218,0.7)', marginTop: 2 }}>Reviewing email feedback</p>
              </div>
              <ToggleMockup gmailOn={true} driveOn={false} />
            </div>
            <div style={{ flex: 1, minWidth: 200, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(37,55,70,0.09)' }}>
              <div style={{ padding: '8px 12px', backgroundColor: '#253746' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 800, color: '#f2e8da', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Conversation B</p>
                <p style={{ fontSize: 12, color: 'rgba(242,232,218,0.7)', marginTop: 2 }}>Writing a campaign brief</p>
              </div>
              <ToggleMockup gmailOn={false} driveOn={false} />
            </div>
          </div>

          <div style={{ marginTop: 12, borderLeft: '3px solid #79dbd4', backgroundColor: 'rgba(121,219,212,0.07)', padding: '10px 12px', borderRadius: '0 4px 4px 0' }}>
            <p style={{ fontSize: 13, color: '#253746', lineHeight: 1.6 }}>
              <strong>Why keep them separate?</strong> Any connector you leave on gets used by Claude automatically — even when you didn't ask. Starting a clean conversation keeps Claude focused and avoids unexpected file reads eating into your token budget.
            </p>
          </div>
        </div>

        {/* Section 3: Auto vs On Demand */}
        <div style={{ background: 'white', borderRadius: 6, border: '1px solid rgba(37,55,70,0.09)', padding: '18px', marginBottom: 20 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, color: '#253746', marginBottom: 12, letterSpacing: '0.02em' }}>
            Auto vs. On Demand mode
          </p>
          <p style={{ fontSize: 13.5, color: 'rgba(37,55,70,0.7)', lineHeight: 1.65, marginBottom: 12 }}>
            Inside the Connectors menu you'll also see a <strong>Tool access</strong> setting with two options:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                label: 'Auto (default)',
                color: '#4e5a31',
                desc: 'Claude decides when to use a connector. Good for most tasks — Claude will pull in Gmail or Drive when it thinks it helps.',
              },
              {
                label: 'On Demand',
                color: '#884933',
                desc: "Claude only uses a connector when you explicitly ask (e.g., \"Check my Gmail for the latest reply from Target\"). Best if you have several connectors on and want to stay in control.",
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
