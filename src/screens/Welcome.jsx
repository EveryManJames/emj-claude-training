import EMJLogo from '../components/EMJLogo.jsx';

export default function Welcome({ onNext }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#253746' }}>
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <EMJLogo className="text-5xl mb-8" light />

        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ backgroundColor: '#79dbd4', color: '#253746' }}>
            Team Training
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4" style={{ color: '#f2e8da' }}>
            Claude 101
          </h1>
          <p className="text-lg max-w-md mx-auto" style={{ color: 'rgba(242,232,218,0.75)' }}>
            A quick guide to using Claude smarter — so we get more done without burning through our budget.
          </p>
        </div>

        {/* Stats teaser */}
        <div className="grid grid-cols-3 gap-4 max-w-sm w-full my-8">
          {[
            { num: '5', label: 'Lessons' },
            { num: '~10', label: 'Minutes' },
            { num: '💡', label: 'Better prompts' },
          ].map((s, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
              <div className="text-2xl font-black" style={{ color: '#ffc56e' }}>{s.num}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(242,232,218,0.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onNext}
          className="px-10 py-4 rounded-full text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          style={{ backgroundColor: '#ffc56e', color: '#253746' }}
        >
          Let's Get Started →
        </button>

        <p className="mt-4 text-xs" style={{ color: 'rgba(242,232,218,0.4)' }}>
          No technical experience required
        </p>
      </div>
    </div>
  );
}
