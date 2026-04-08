export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  const steps = ["Intro", "Tokens", "Context", "Tips", "Quiz", "Done"];

  return (
    <div className="w-full px-6 py-4" style={{ backgroundColor: '#253746' }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  backgroundColor: i < current ? '#79dbd4' : i === current ? '#ffc56e' : 'rgba(255,255,255,0.15)',
                  color: i <= current ? '#253746' : 'rgba(255,255,255,0.4)',
                  border: i === current ? '2px solid #ffc56e' : '2px solid transparent'
                }}
              >
                {i < current ? '✓' : i + 1}
              </div>
              <span className="text-xs hidden sm:block" style={{ color: i <= current ? '#f2e8da' : 'rgba(242,232,218,0.4)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full rounded-full h-1.5 mt-1" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: '#79dbd4' }}
          />
        </div>
      </div>
    </div>
  );
}
