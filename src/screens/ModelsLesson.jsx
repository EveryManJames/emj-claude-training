const BTN_BASE = {
  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
  fontSize: 15, letterSpacing: '0.04em', border: 'none', cursor: 'pointer',
  borderRadius: 4, transition: 'all 0.15s',
};

const MODELS = [
  {
    name: 'HAIKU',
    emoji: '🐦',
    tagline: 'Fast & lean — for simple, repetitive tasks',
    cost: '$',
    costLabel: 'Most affordable',
    color: '#79dbd4',
    lightText: false,
    badge: 'Lightest',
    useCases: [
      'Quick one-line answers and lookups',
      'Auto-categorizing or tagging content',
      'Simple fill-in-the-blank copy variants',
      'High-volume, repetitive generation tasks',
    ],
    note: null,
  },
  {
    name: 'SONNET',
    emoji: '⚡',
    tagline: 'The workhorse — powerful, fast, and cost-efficient',
    cost: '$$',
    costLabel: 'Balanced',
    color: '#ffc56e',
    lightText: false,
    badge: 'YOUR DEFAULT ★',
    useCases: [
      'Product descriptions and campaign copy',
      'Email drafts, subject lines, social captions',
      'Summarizing documents and meeting notes',
      'Multi-step analysis and research',
      'Answering complex brand or business questions',
    ],
    note: 'This is what you should reach for every single time. Sonnet handles 99.9% of what EMJ will ever ask of Claude.',
  },
  {
    name: 'OPUS',
    emoji: '🏔️',
    tagline: 'Frontier intelligence — for genuinely extraordinary problems',
    cost: '$$$$',
    costLabel: 'Most expensive by far',
    color: '#253746',
    lightText: true,
    badge: 'Use with caution',
    useCases: [
      'Multi-step reasoning across thousands of data points',
      'Novel scientific hypothesis generation',
      'Complex legal or regulatory synthesis',
      'Advanced mathematical proof and theorem work',
    ],
    note: null,
  },
];

const OPUS_EXAMPLES = [
  {
    org: 'Pharmaceutical researchers',
    task: 'Synthesizing findings across 50,000+ clinical studies to identify novel drug interaction candidates that no human team could manually cross-reference',
  },
  {
    org: 'Major law firms',
    task: 'Analyzing millions of pages of case law to construct novel constitutional arguments in landmark litigation with no clear precedent',
  },
  {
    org: 'Climate research institutions',
    task: 'Modeling hundreds of interdependent atmospheric variables simultaneously to generate novel hypotheses about long-range climate tipping points',
  },
  {
    org: 'Quantitative hedge funds',
    task: 'Building novel financial instruments requiring simultaneous synthesis of global regulatory frameworks, macro-economic signals, and market microstructure',
  },
  {
    org: 'AI safety labs',
    task: 'Automated reasoning over complex multi-step logical systems and formal mathematical proofs that exceed human working memory capacity',
  },
];

export default function ModelsLesson({ onNext, onBack }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f2e8da' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Chapter header */}
        <div className="fade-up" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 24 }}>
          <div className="font-display" style={{
            fontSize: 90, fontWeight: 900, lineHeight: 0.8,
            color: 'rgba(37,55,70,0.09)', letterSpacing: '-5px',
            userSelect: 'none', flexShrink: 0, marginTop: -4,
          }}>04</div>
          <div style={{ flex: 1 }}>
            <span style={{
              display: 'inline-block', fontSize: 9.5, fontWeight: 800, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#f2e8da', backgroundColor: '#4e5a31',
              padding: '3px 10px', borderRadius: 2, marginBottom: 8,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}>Lesson 4 of 4</span>
            <h2 className="font-display" style={{ color: '#253746', fontSize: 32, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.5px' }}>
              CHOOSING THE RIGHT MODEL
            </h2>
            <p style={{ color: '#253746', opacity: 0.68, marginTop: 6, fontSize: 14.5, lineHeight: 1.65 }}>
              Claude comes in three tiers — Haiku, Sonnet, and Opus. They're not interchangeable. Each has a distinct capability level and a very different price tag.
            </p>
          </div>
        </div>

        {/* Model cards */}
        <div className="fade-up delay-1" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {MODELS.map((model, i) => (
            <div
              key={model.name}
              className="card"
              style={{
                border: model.name === 'SONNET'
                  ? '2px solid #ffc56e'
                  : model.name === 'OPUS'
                  ? '2px solid #253746'
                  : '1px solid rgba(37,55,70,0.07)',
              }}
            >
              {/* Header */}
              <div style={{
                padding: '12px 16px', backgroundColor: model.color,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderRadius: '4px 4px 0 0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{model.emoji}</span>
                  <div>
                    <span className="font-display" style={{
                      color: model.lightText ? '#f2e8da' : '#253746',
                      fontSize: 20, fontWeight: 900, letterSpacing: '0.02em', lineHeight: 1,
                    }}>
                      CLAUDE {model.name}
                    </span>
                    <div style={{
                      fontSize: 11.5, lineHeight: 1.3, marginTop: 2,
                      color: model.lightText ? 'rgba(242,232,218,0.72)' : 'rgba(37,55,70,0.65)',
                    }}>
                      {model.tagline}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                  <div className="font-display" style={{
                    fontSize: 16, fontWeight: 900, letterSpacing: '0.02em',
                    color: model.lightText ? '#ffc56e' : '#253746',
                  }}>{model.cost}</div>
                  <div style={{
                    fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    color: model.lightText ? 'rgba(242,232,218,0.55)' : 'rgba(37,55,70,0.5)',
                  }}>{model.costLabel}</div>
                </div>
              </div>

              {/* Badge */}
              <div style={{
                padding: '4px 16px',
                backgroundColor: model.name === 'SONNET' ? '#253746' : model.name === 'OPUS' ? '#884933' : 'rgba(37,55,70,0.06)',
              }}>
                <span className="font-display" style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: model.name === 'SONNET' || model.name === 'OPUS' ? '#f2e8da' : 'rgba(37,55,70,0.45)',
                }}>{model.badge}</span>
              </div>

              {/* Use cases */}
              <div style={{ padding: '12px 16px' }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(37,55,70,0.4)', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>
                  Best for:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {model.useCases.map((uc, j) => (
                    <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5 }}>
                      <span style={{ color: '#79dbd4', flexShrink: 0, marginTop: 1 }}>→</span>
                      <span style={{ color: '#253746', opacity: 0.82, lineHeight: 1.45 }}>{uc}</span>
                    </div>
                  ))}
                </div>
                {model.note && (
                  <div style={{ marginTop: 12, padding: '10px 12px', backgroundColor: 'rgba(255,197,110,0.15)', borderRadius: 5, border: '1.5px solid rgba(255,197,110,0.5)' }}>
                    <p style={{ fontSize: 13, lineHeight: 1.55, color: '#253746', fontWeight: 600 }}>
                      ★ {model.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Opus deep dive */}
        <div className="fade-up delay-2" style={{ backgroundColor: '#253746', borderRadius: 8, marginBottom: 16 }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-display" style={{ color: '#ffc56e', fontSize: 16, fontWeight: 900, letterSpacing: '0.03em', marginBottom: 4 }}>
              🏔️ WHAT OPUS IS ACTUALLY BEING USED FOR
            </p>
            <p style={{ color: 'rgba(242,232,218,0.65)', fontSize: 13.5, lineHeight: 1.55 }}>
              These are real categories of work Opus handles at frontier organizations. Notice a pattern?
            </p>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {OPUS_EXAMPLES.map((ex, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div className="font-display" style={{ fontSize: 16, fontWeight: 900, color: 'rgba(242,232,218,0.2)', flexShrink: 0, width: 20, textAlign: 'right', lineHeight: 1.4 }}>{i + 1}</div>
                <div>
                  <div className="font-display" style={{ fontSize: 12, fontWeight: 800, color: '#79dbd4', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 2 }}>{ex.org}</div>
                  <div style={{ fontSize: 12.5, color: 'rgba(242,232,218,0.7)', lineHeight: 1.5 }}>{ex.task}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ margin: '0 16px 14px', padding: '11px 13px', backgroundColor: '#884933', borderRadius: 6 }}>
            <p className="font-display" style={{ color: '#f2e8da', fontSize: 14, fontWeight: 900, marginBottom: 3, letterSpacing: '0.03em' }}>
              🚀 The punchline
            </p>
            <p style={{ color: 'rgba(242,232,218,0.88)', fontSize: 13, lineHeight: 1.55 }}>
              If your task is writing a product description, drafting a campaign brief, or summarizing a report — you don't need Opus. <strong style={{ color: '#f2e8da' }}>Using Opus for everyday EMJ work is like renting a rocket ship to drive to the grocery store.</strong> Sonnet does it better, faster, and at a fraction of the cost.
            </p>
          </div>
        </div>

        {/* Quick rule */}
        <div className="fade-up delay-3" style={{ backgroundColor: '#4e5a31', borderRadius: 8, padding: '14px 16px', marginBottom: 28, borderLeft: '4px solid #79dbd4' }}>
          <p className="font-display" style={{ color: '#f2e8da', fontSize: 15, fontWeight: 900, marginBottom: 5, letterSpacing: '0.03em' }}>
            ✅ THE EMJ RULE
          </p>
          <p style={{ color: 'rgba(242,232,218,0.88)', fontSize: 14, lineHeight: 1.65 }}>
            Default to <strong style={{ color: '#ffc56e' }}>Sonnet</strong> for everything. Use <strong style={{ color: '#79dbd4' }}>Haiku</strong> only for simple, repetitive tasks. Treat <strong style={{ color: '#f2e8da' }}>Opus</strong> like a specialist surgeon — brilliant, expensive, and almost certainly not what you need today.
          </p>
        </div>

        {/* Nav */}
        <div className="fade-up delay-4" style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onBack}
            className="transition-all hover:opacity-80 active:scale-95"
            style={{ ...BTN_BASE, padding: '12px 22px', backgroundColor: 'transparent', color: '#253746', border: '2px solid #253746' }}
          >
            ← BACK
          </button>
          <button
            onClick={onNext}
            className="transition-all hover:opacity-90 active:scale-95"
            style={{ ...BTN_BASE, flex: 1, padding: '12px 20px', backgroundColor: '#253746', color: '#f2e8da' }}
          >
            NEXT: QUICK QUIZ →
          </button>
        </div>
      </div>
    </div>
  );
}
