const MODELS = [
  {
    name: 'HAIKU',
    emoji: '🐦',
    tagline: 'Fast & affordable — great for quick, everyday tasks',
    cost: '$',
    costLabel: 'Most affordable',
    color: '#79dbd4',
    lightText: false,
    badge: 'Lightest',
    badgeBg: 'rgba(37,55,70,0.06)',
    badgeColor: 'rgba(37,55,70,0.45)',
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
    badgeBg: '#253746',
    badgeColor: '#f2e8da',
    useCases: [
      'Product descriptions and campaign copy',
      'Email drafts, subject lines, social captions',
      'Summarizing documents and meeting notes',
      'Multi-step analysis and research',
      'Answering complex brand or business questions',
    ],
    note: 'This is what you should reach for most of the time — unless your task is quick and straightforward, in which case Haiku often handles it just as well, faster and cheaper.',
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
    badgeBg: '#884933',
    badgeColor: '#f2e8da',
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
  { org: 'Pharmaceutical researchers', task: 'Synthesizing findings across 50,000+ clinical studies to identify novel drug interaction candidates that no human team could manually cross-reference' },
  { org: 'Major law firms', task: 'Analyzing millions of pages of case law to construct novel constitutional arguments in landmark litigation with no clear precedent' },
  { org: 'Climate research institutions', task: 'Modeling hundreds of interdependent atmospheric variables simultaneously to generate novel hypotheses about long-range climate tipping points' },
  { org: 'Quantitative hedge funds', task: 'Building novel financial instruments requiring simultaneous synthesis of global regulatory frameworks, macro-economic signals, and market microstructure' },
  { org: 'AI safety labs', task: 'Automated reasoning over complex multi-step logical systems and formal mathematical proofs that exceed human working memory capacity' },
];

export default function ModelsLesson({ onNext, onBack }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f2e8da' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 48px' }}>

        <div style={{ marginBottom: 28 }}>
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#f2e8da', backgroundColor: '#4e5a31',
            padding: '3px 10px', borderRadius: 2, marginBottom: 12,
            fontFamily: "'Barlow Condensed', sans-serif",
          }}>
            Lesson 4 of 4
          </span>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: '#253746', fontSize: 28, fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.5px', marginBottom: 8,
          }}>
            Choosing the Right Model
          </h2>
          <p style={{ color: 'rgba(37,55,70,0.7)', fontSize: 14.5, lineHeight: 1.65 }}>
            Claude comes in three tiers — Haiku, Sonnet, and Opus. Each has a different capability level and price tag. Knowing when to use each one is how you get the most out of your team's budget.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {MODELS.map((model) => (
            <div
              key={model.name}
              style={{
                background: 'white', borderRadius: 6,
                border: model.name === 'SONNET'
                  ? '2px solid #ffc56e'
                  : model.name === 'OPUS'
                  ? '2px solid #253746'
                  : '1px solid rgba(37,55,70,0.09)',
              }}
            >
              <div style={{
                padding: '12px 16px', backgroundColor: model.color,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderRadius: model.name === 'SONNET' ? '4px 4px 0 0' : model.name === 'OPUS' ? '4px 4px 0 0' : '5px 5px 0 0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{model.emoji}</span>
                  <div>
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: model.lightText ? '#f2e8da' : '#253746',
                      fontSize: 19, fontWeight: 900, letterSpacing: '0.02em', lineHeight: 1,
                    }}>
                      CLAUDE {model.name}
                    </div>
                    <div style={{
                      fontSize: 11.5, lineHeight: 1.3, marginTop: 2,
                      color: model.lightText ? 'rgba(242,232,218,0.65)' : 'rgba(37,55,70,0.6)',
                    }}>
                      {model.tagline}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 900,
                    color: model.lightText ? '#ffc56e' : '#253746',
                  }}>{model.cost}</div>
                  <div style={{
                    fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    color: model.lightText ? 'rgba(242,232,218,0.5)' : 'rgba(37,55,70,0.45)',
                  }}>{model.costLabel}</div>
                </div>
              </div>

              <div style={{ padding: '5px 16px', backgroundColor: model.badgeBg }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: model.badgeColor,
                }}>{model.badge}</span>
              </div>

              <div style={{ padding: '12px 16px' }}>
                <p style={{
                  fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'rgba(37,55,70,0.38)', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8,
                }}>
                  Best for:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {model.useCases.map((uc, j) => (
                    <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5 }}>
                      <span style={{ color: '#79dbd4', flexShrink: 0, marginTop: 1 }}>→</span>
                      <span style={{ color: 'rgba(37,55,70,0.8)', lineHeight: 1.45 }}>{uc}</span>
                    </div>
                  ))}
                </div>
                {model.note && (
                  <div style={{ marginTop: 12, padding: '10px 12px', backgroundColor: 'rgba(255,197,110,0.12)', borderRadius: 4, border: '1px solid rgba(255,197,110,0.4)' }}>
                    <p style={{ fontSize: 13, lineHeight: 1.55, color: '#253746', fontWeight: 600 }}>
                      ★ {model.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#253746', borderRadius: 6, marginBottom: 20 }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffc56e', fontSize: 15, fontWeight: 900, letterSpacing: '0.02em', marginBottom: 4 }}>
              🏔️ What Opus Is Actually Being Used For
            </p>
            <p style={{ color: 'rgba(242,232,218,0.6)', fontSize: 13.5, lineHeight: 1.55 }}>
              These are real categories of work Opus handles at frontier organizations. Notice a pattern?
            </p>
          </div>
          <div style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {OPUS_EXAMPLES.map((ex, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 900, color: 'rgba(242,232,218,0.18)', flexShrink: 0, width: 18, textAlign: 'right', lineHeight: 1.4 }}>{i + 1}</div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11.5, fontWeight: 800, color: '#79dbd4', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 2 }}>{ex.org}</div>
                  <div style={{ fontSize: 13, color: 'rgba(242,232,218,0.65)', lineHeight: 1.55 }}>{ex.task}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ margin: '0 14px 14px', padding: '12px 14px', backgroundColor: '#884933', borderRadius: 4 }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#f2e8da', fontSize: 13.5, fontWeight: 900, marginBottom: 3 }}>
              🚀 The punchline
            </p>
            <p style={{ color: 'rgba(242,232,218,0.85)', fontSize: 13, lineHeight: 1.55 }}>
              If your task is writing a product description, drafting a campaign brief, or summarizing a report — you don't need Opus. <strong style={{ color: '#f2e8da' }}>Using Opus for everyday EMJ work is like renting a rocket ship to drive to the grocery store.</strong> Haiku or Sonnet will do it better, faster, and at a fraction of the cost.
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#4e5a31', borderRadius: '0 6px 6px 0', padding: '14px 16px',
          marginBottom: 28, borderLeft: '3px solid #79dbd4',
        }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#f2e8da', fontSize: 14, fontWeight: 900, marginBottom: 5 }}>
            ✅ The EMJ Rule
          </p>
          <p style={{ color: 'rgba(242,232,218,0.88)', fontSize: 14, lineHeight: 1.65 }}>
            <strong style={{ color: '#79dbd4' }}>Haiku</strong> is surprisingly capable — use it for quick, everyday tasks. Reach for <strong style={{ color: '#ffc56e' }}>Sonnet</strong> when you need more depth, better reasoning, or longer outputs. Treat <strong style={{ color: '#f2e8da' }}>Opus</strong> like a specialist surgeon — brilliant, expensive, and almost certainly not what you need today.
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
