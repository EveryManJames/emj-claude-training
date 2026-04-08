import EMJLogo from '../components/EMJLogo.jsx';

const TIPS = [
  { icon: '🎯', tip: 'Be specific: include length, tone, and format in every prompt.' },
  { icon: '🆕', tip: 'Start fresh conversations for new topics.' },
  { icon: '✂️', tip: 'Only paste what Claude truly needs — not whole documents.' },
  { icon: '♻️', tip: 'Use Claude Projects to save your EMJ brand context once.' },
  { icon: '🔗', tip: 'Batch related tasks into a single, focused conversation.' },
  { icon: '📏', tip: 'Ask for shorter outputs when you don\'t need a novel.' },
];

export default function Complete({ onRestart }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#253746' }}>
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">

        <div className="text-6xl mb-4">🎉</div>
        <EMJLogo className="text-4xl mb-6" light />

        <h2 className="text-3xl font-black mb-2" style={{ color: '#ffc56e' }}>
          Training Complete!
        </h2>
        <p className="mb-8" style={{ color: 'rgba(242,232,218,0.75)' }}>
          You now know more about Claude tokens than 95% of people using AI tools at work. Here's your quick reference card.
        </p>

        {/* Reference card */}
        <div className="rounded-2xl p-6 mb-8 text-left" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
          <p className="font-black text-lg mb-4" style={{ color: '#79dbd4' }}>
            📋 Your EMJ × Claude Cheat Sheet
          </p>
          <div className="space-y-3">
            {TIPS.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-xl">{item.icon}</span>
                <p className="text-sm leading-snug" style={{ color: '#f2e8da', opacity: 0.9 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus tip */}
        <div className="rounded-2xl p-5 mb-8 text-left border-l-4" style={{ backgroundColor: 'rgba(121,219,212,0.1)', borderColor: '#79dbd4' }}>
          <p className="font-bold mb-1" style={{ color: '#79dbd4' }}>🚀 Bonus: The 10-Second Test</p>
          <p className="text-sm" style={{ color: '#f2e8da', opacity: 0.85 }}>
            Before hitting send, ask yourself: <em>"Could someone write a shorter version of this prompt that still gets the same result?"</em> If yes — trim it. Your team budget will thank you.
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full py-3 rounded-full font-bold border-2 transition-all hover:opacity-80"
            style={{ borderColor: 'rgba(242,232,218,0.3)', color: 'rgba(242,232,218,0.6)' }}
          >
            ↩ Restart Training
          </button>
        </div>

        <p className="mt-8 text-xs" style={{ color: 'rgba(242,232,218,0.3)' }}>
          Questions? Ask your IT admin. Built for the EMJ team by James Martin.
        </p>
      </div>
    </div>
  );
}
