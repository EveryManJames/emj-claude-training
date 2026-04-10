const TIPS = [
  { icon: '🎯', tip: 'Be specific: include length, tone, and format in every prompt.' },
  { icon: '🆕', tip: 'Start fresh conversations for new topics.' },
  { icon: '✂️', tip: "Only paste what Claude truly needs — not whole documents." },
  { icon: '♻️', tip: 'Use Claude Projects to save your EMJ brand context once.' },
  { icon: '🔗', tip: 'Batch related tasks into a single, focused conversation.' },
  { icon: '📏', tip: "Ask for shorter outputs when you don't need a novel." },
];

export default function Complete({ onRestart }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#253746' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg, #79dbd4 0%, #ffc56e 50%, #884933 100%)', flexShrink: 0 }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ maxWidth: 540, width: '100%' }}>

          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <img src="/emj-logo.png" alt="Every Man Jack" style={{ width: 80, height: 80, borderRadius: 8, display: 'inline-block', marginBottom: 14 }} />
            <div style={{ marginTop: 12 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffc56e', fontSize: 40, fontWeight: 900, letterSpacing: '-1px', lineHeight: 1, margin: 0 }}>
                TRAINING
              </h2>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#f2e8da', fontSize: 40, fontWeight: 900, letterSpacing: '-1px', lineHeight: 1, marginBottom: 14 }}>
                COMPLETE
              </h2>
            </div>
            <p style={{ color: 'rgba(242,232,218,0.6)', fontSize: 14.5, lineHeight: 1.7, maxWidth: 360, margin: '0 auto' }}>
              You now know more about Claude tokens than 95% of people using AI tools at work. Here's your quick reference card.
            </p>
          </div>

          <div className="fade-up delay-1" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: '18px', marginBottom: 14, border: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#79dbd4', fontSize: 14, fontWeight: 900, letterSpacing: '0.04em', marginBottom: 14 }}>
              📋 YOUR EMJ × CLAUDE CHEAT SHEET
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {TIPS.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 17, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                  <p style={{ color: 'rgba(242,232,218,0.82)', fontSize: 14, lineHeight: 1.6 }}>{item.tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up delay-2" style={{
            padding: '14px 16px', marginBottom: 28,
            borderLeft: '3px solid #79dbd4', backgroundColor: 'rgba(121,219,212,0.07)',
            borderRadius: '0 4px 4px 0',
          }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#79dbd4', fontSize: 13.5, fontWeight: 900, marginBottom: 5, letterSpacing: '0.02em' }}>
              🚀 BONUS: THE 10-SECOND TEST
            </p>
            <p style={{ color: 'rgba(242,232,218,0.78)', fontSize: 13.5, lineHeight: 1.65 }}>
              Before hitting send, ask yourself: <em>"Could someone write a shorter version of this prompt that still gets the same result?"</em> If yes — trim it. Your team budget will thank you.
            </p>
          </div>

          <div className="fade-up delay-3" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={onRestart}
              className="transition-all hover:opacity-70"
              style={{
                width: '100%', padding: '12px 20px', borderRadius: 4, cursor: 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.06em',
                backgroundColor: 'transparent', color: 'rgba(242,232,218,0.38)',
                border: '2px solid rgba(242,232,218,0.12)',
              }}
            >
              ↩ RESTART TRAINING
            </button>
          </div>

          <p style={{ marginTop: 24, textAlign: 'center', color: 'rgba(242,232,218,0.2)', fontSize: 11 }}>
            Questions? Ask your IT admin. Built for the EMJ team by James Martin.
          </p>
        </div>
      </div>
    </div>
  );
}
