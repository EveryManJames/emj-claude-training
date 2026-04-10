export default function Welcome({ onNext }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f2e8da' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg, #79dbd4 0%, #ffc56e 50%, #884933 100%)', flexShrink: 0 }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>

        <div className="fade-up" style={{ marginBottom: 12 }}>
          <img
            src="/logo.jpg"
            alt="Every Man Jack"
            style={{ width: 88, height: 88, borderRadius: 8, display: 'block', margin: '0 auto' }}
          />
        </div>

        <div className="fade-up delay-1" style={{ marginBottom: 24 }}>
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#f2e8da', backgroundColor: '#253746',
            padding: '3px 10px', borderRadius: 2, marginBottom: 16,
            fontFamily: "'Barlow Condensed', sans-serif",
          }}>
            Team Training
          </span>
          <div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: '#253746', fontWeight: 900, lineHeight: 0.88,
              fontSize: 'clamp(44px, 11vw, 76px)', letterSpacing: '-2px', margin: 0,
            }}>
              CLAUDE USAGE
            </h1>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: '#884933', fontWeight: 900, lineHeight: 0.88,
              fontSize: 'clamp(44px, 11vw, 76px)', letterSpacing: '-2px',
              marginBottom: 16,
            }}>
              101
            </h1>
          </div>
          <p style={{ color: 'rgba(37,55,70,0.6)', fontSize: 14.5, lineHeight: 1.7, maxWidth: 320, margin: '0 auto' }}>
            A quick guide to using Claude smarter — so we get more done without burning through our budget.
          </p>
        </div>

        <div className="fade-up delay-2" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', border: '1px solid rgba(37,55,70,0.1)', borderRadius: 4, overflow: 'hidden' }}>
            {[
              { num: '4', label: 'Lessons' },
              { num: '~10', label: 'Minutes' },
              { num: '💡', label: 'Better prompts' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 24px', textAlign: 'center',
                  backgroundColor: i === 1 ? '#253746' : 'rgba(37,55,70,0.03)',
                  borderLeft: i > 0 ? '1px solid rgba(37,55,70,0.1)' : 'none',
                }}
              >
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: i === 1 ? '#ffc56e' : '#253746',
                  fontSize: 28, fontWeight: 900, lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: i === 1 ? 'rgba(242,232,218,0.5)' : 'rgba(37,55,70,0.4)',
                  fontSize: 9.5, marginTop: 3, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up delay-3">
          <button
            onClick={onNext}
            className="transition-all duration-150 hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: '#253746', color: '#f2e8da',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: 16, letterSpacing: '0.08em',
              padding: '13px 44px', borderRadius: 4, border: 'none', cursor: 'pointer',
            }}
          >
            LET'S GET STARTED →
          </button>
          <p style={{ marginTop: 10, color: 'rgba(37,55,70,0.25)', fontSize: 11.5 }}>No technical experience required</p>
        </div>
      </div>
    </div>
  );
}
