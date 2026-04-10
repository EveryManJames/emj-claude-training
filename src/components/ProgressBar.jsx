export default function ProgressBar({ current }) {
  const STEPS = ['Tokens', 'Context', 'Tips', 'Models', 'Quiz'];

  return (
    <div style={{ backgroundColor: '#253746', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 672, margin: '0 auto', padding: '10px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
          {STEPS.map((label, i) => {
            const stepNum = i + 1;
            const done = stepNum < current;
            const active = stepNum === current;

            return (
              <div
                key={i}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
              >
                {i > 0 && (
                  <div style={{
                    position: 'absolute', top: 9, right: '50%', left: 0, height: 2,
                    backgroundColor: done || active ? '#79dbd4' : 'rgba(255,255,255,0.08)',
                    transition: 'background-color 0.4s ease',
                  }} />
                )}
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 9, left: '50%', right: 0, height: 2,
                    backgroundColor: done ? '#79dbd4' : 'rgba(255,255,255,0.08)',
                    transition: 'background-color 0.4s ease',
                  }} />
                )}
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', zIndex: 1, position: 'relative',
                  backgroundColor: done ? '#79dbd4' : active ? '#ffc56e' : 'rgba(255,255,255,0.06)',
                  border: `2px solid ${done ? '#79dbd4' : active ? '#ffc56e' : 'rgba(255,255,255,0.12)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 8,
                  color: done || active ? '#253746' : 'rgba(255,255,255,0.25)',
                  transition: 'all 0.35s ease',
                  flexShrink: 0,
                }}>
                  {done ? '✓' : stepNum}
                </div>
                <span style={{
                  display: 'none',
                  ...(typeof window !== 'undefined' && window.innerWidth >= 480 ? { display: 'block' } : {}),
                }} className="hidden sm:block">
                  <span style={{
                    marginTop: 4, fontSize: 7.5, fontWeight: 700, display: 'block',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    color: done || active ? 'rgba(242,232,218,0.75)' : 'rgba(242,232,218,0.18)',
                    transition: 'color 0.35s ease',
                    whiteSpace: 'nowrap',
                  }}>
                    {label}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
