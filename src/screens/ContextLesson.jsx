import { useState } from 'react';

const MESSAGES = [
  { role: 'user', text: "Write 3 tagline options for our Cedar + Citrus Body Wash launch.", tokens: 14, tag: null },
  { role: 'assistant', text: "Here you go: 1) 'Wake up. Stand out.' 2) 'Bold scent. Clean conscience.' 3) 'Cedar. Citrus. Unstoppable.'", tokens: 30, tag: '🧴 Work' },
  { role: 'user', text: "Can you help me prep for a 3pm call with Target? Need 3 talking points about our Q3 sell-through.", tokens: 22, tag: null },
  { role: 'assistant', text: "Sure! 1) Q3 sell-through up 18% YoY, led by deodorant SKUs. 2) New end-cap placement opportunity in personal care aisle. 3) Pitch the holiday gifting set — strong co-op ad potential.", tokens: 52, tag: '📊 Work' },
  { role: 'user', text: "Hey random question — what's a good homemade pizza dough recipe? Making it tonight.", tokens: 18, tag: null },
  { role: 'assistant', text: "Easy! Mix 2¼ tsp yeast with warm water, add 3 cups flour, 1 tsp salt, 2 tbsp olive oil. Knead 8 mins, let rise 1 hr. Stretch thin, top as you like, bake at 500°F for 10-12 mins.", tokens: 52, tag: '🍕 Personal' },
  { role: 'user', text: "Back to EMJ — write a 60-word product description for the Cedar + Citrus Body Wash. Masculine tone.", tokens: 22, tag: null },
  { role: 'assistant', text: "Cedar + Citrus Body Wash by Every Man Jack delivers a bold, energizing clean. Formulated with natural ingredients, this sharp blend of cedar and citrus cuts through the day with a fresh, powerful scent. No harsh chemicals. No compromise. Built for men who demand more.", tokens: 60, tag: '🧴 Work' },
];

export default function ContextLesson({ onNext, onBack }) {
  const [visible, setVisible] = useState(2);

  const totalTokens = MESSAGES.slice(0, visible).reduce((sum, m) => sum + m.tokens, 0);
  const maxTokens = 270;
  const fillPct = Math.min((totalTokens / maxTokens) * 100, 100);
  const fillColor = fillPct < 50 ? '#79dbd4' : fillPct < 80 ? '#ffc56e' : '#884933';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f2e8da' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 48px' }}>

        <div style={{ marginBottom: 28 }}>
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#253746', backgroundColor: '#ffc56e',
            padding: '3px 10px', borderRadius: 2, marginBottom: 12,
            fontFamily: "'Barlow Condensed', sans-serif",
          }}>
            Lesson 2 of 4
          </span>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: '#253746', fontSize: 28, fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.5px', marginBottom: 8,
          }}>
            The Context Window
          </h2>
          <p style={{ color: 'rgba(37,55,70,0.7)', fontSize: 14.5, lineHeight: 1.65 }}>
            Every conversation has a <strong>"context window"</strong> — Claude can only see a fixed amount of text at once. Every message in your chat history counts against it, even unrelated ones.
          </p>
        </div>

        <div style={{
          borderLeft: '3px solid #884933', backgroundColor: 'rgba(136,73,51,0.06)',
          padding: '14px 16px', marginBottom: 20, borderRadius: '0 4px 4px 0',
        }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, color: '#884933', marginBottom: 5 }}>
            🗂️ The Messy Desk Analogy
          </p>
          <p style={{ color: 'rgba(37,55,70,0.75)', fontSize: 14, lineHeight: 1.65 }}>
            Imagine asking a colleague to write a product description — but first they have to re-read every sticky note, recipe printout, and meeting agenda spread across your desk. That's what Claude does: before answering your new message, it re-reads <em>everything</em> said earlier in the chat, even your pizza recipe.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: 6, border: '1px solid rgba(37,55,70,0.09)', marginBottom: 20 }}>
          <div style={{ padding: '16px 18px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <p style={{ fontWeight: 600, color: '#253746', fontSize: 13.5 }}>A real workday chat — mixed topics, one window filling up:</p>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 800,
                color: fillColor, flexShrink: 0, marginLeft: 12,
              }}>
                {totalTokens} / {maxTokens}
              </span>
            </div>
            <div style={{ width: '100%', borderRadius: 3, height: 6, backgroundColor: 'rgba(37,55,70,0.08)', marginBottom: 16 }}>
              <div style={{ height: '100%', borderRadius: 3, width: `${fillPct}%`, backgroundColor: fillColor, transition: 'width 0.5s ease, background-color 0.3s ease' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12, maxHeight: 260, overflowY: 'auto', paddingRight: 4 }}>
              {MESSAGES.slice(0, visible).map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  {msg.tag && (
                    <span style={{
                      fontSize: 9.5, fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      color: msg.tag.includes('Personal') ? '#884933' : '#4e5a31',
                      marginBottom: 3,
                    }}>{msg.tag}</span>
                  )}
                  <div style={{
                    padding: '9px 13px', fontSize: 13, maxWidth: '80%', borderRadius: 6,
                    backgroundColor: msg.role === 'user' ? '#253746' : '#f2e8da',
                    color: msg.role === 'user' ? '#f2e8da' : '#253746',
                    border: msg.role === 'assistant'
                      ? (msg.tag?.includes('Personal') ? '1px solid rgba(136,73,51,0.25)' : '1px solid rgba(37,55,70,0.1)')
                      : 'none',
                    lineHeight: 1.55,
                  }}>
                    <p>{msg.text}</p>
                    <p style={{ fontSize: 10, marginTop: 4, opacity: 0.45, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: '0.04em' }}>
                      {msg.tokens} tokens
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {visible < MESSAGES.length && (
                <button
                  onClick={() => setVisible(v => Math.min(v + 2, MESSAGES.length))}
                  className="transition-all hover:opacity-80"
                  style={{
                    flex: 1, padding: '9px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.04em', borderRadius: 4,
                    backgroundColor: 'rgba(37,55,70,0.04)', color: '#253746',
                    border: '1px solid rgba(37,55,70,0.15)',
                  }}
                >
                  + Continue conversation
                </button>
              )}
              {visible > 2 && (
                <button
                  onClick={() => setVisible(2)}
                  className="transition-all hover:opacity-80"
                  style={{
                    padding: '9px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.04em', borderRadius: 4,
                    backgroundColor: 'transparent', color: '#884933', border: '1px solid #884933',
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {fillPct >= 80 && (
            <div style={{ padding: '11px 18px', backgroundColor: '#884933', color: '#f2e8da', fontSize: 13, fontWeight: 600, lineHeight: 1.55, borderRadius: '0 0 6px 6px' }}>
              ⚠️ Window nearly full! Claude just re-read your Target call prep, pizza recipe, AND taglines to write that product description. Every token in this chat was "charged" again.
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#253746', color: '#f2e8da', borderRadius: 6, padding: '16px 18px', marginBottom: 28 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, marginBottom: 12, letterSpacing: '0.02em' }}>🛠️ How to Keep Your Context Lean</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🆕', tip: "Start a fresh conversation for each new topic — don't reuse old chats for new tasks." },
              { icon: '✂️', tip: 'Avoid copy-pasting huge documents. Pull out only the relevant section.' },
              { icon: '📋', tip: "Don't paste entire spreadsheets or email threads unless Claude truly needs all of it." },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <p style={{ opacity: 0.85, fontSize: 13.5, lineHeight: 1.6 }}>{item.tip}</p>
              </div>
            ))}
          </div>
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
            NEXT: PROMPTING TIPS →
          </button>
        </div>
      </div>
    </div>
  );
}
