import { useState } from 'react';

const MESSAGES = [
  { role: 'user', text: 'Hey Claude!', tokens: 4 },
  { role: 'assistant', text: 'Hi! How can I help with EMJ today?', tokens: 12 },
  { role: 'user', text: 'What\'s the difference between our body wash and bar soap?', tokens: 15 },
  { role: 'assistant', text: 'Great question! The EMJ Body Wash uses a liquid formula with moisturizing agents, while the bar soap is a more traditional cleansing bar. Both use natural ingredients...', tokens: 38 },
  { role: 'user', text: 'Can you write a 200-word product description for the cedar scent?', tokens: 16 },
  { role: 'assistant', text: 'Sure! Cedar + Sage Body Wash by Every Man Jack delivers a bold, woodsy clean...', tokens: 52 },
  { role: 'user', text: 'Actually, rewrite that but make it 50% longer', tokens: 11 },
  { role: 'assistant', text: '[A longer cedar description with more detail about the scent profile...]', tokens: 78 },
];

export default function ContextLesson({ onNext, onBack }) {
  const [visible, setVisible] = useState(2);

  const totalTokens = MESSAGES.slice(0, visible).reduce((sum, m) => sum + m.tokens, 0);
  const maxTokens = 200;
  const fillPct = Math.min((totalTokens / maxTokens) * 100, 100);

  const fillColor = fillPct < 50 ? '#79dbd4' : fillPct < 80 ? '#ffc56e' : '#884933';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f2e8da' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">

        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: '#ffc56e', color: '#253746' }}>
            Lesson 2 of 4
          </span>
          <h2 className="text-3xl font-black mb-2" style={{ color: '#253746' }}>
            The Context Window 🪟
          </h2>
          <p style={{ color: '#253746', opacity: 0.75 }}>
            Every conversation has a <strong>"context window"</strong> — a limit on how much Claude can see at once. It's like the shelves in our stockroom: there's only so much space.
          </p>
        </div>

        {/* Analogy card */}
        <div className="rounded-2xl p-5 mb-6 border-l-4" style={{ backgroundColor: 'white', borderColor: '#884933' }}>
          <p className="font-bold mb-1" style={{ color: '#884933' }}>🏪 The Stockroom Analogy</p>
          <p style={{ color: '#253746', opacity: 0.8, fontSize: '0.95rem' }}>
            Imagine asking a stockroom associate to find a product — but first you make them read every email you've sent in the last year.
            They can only hold so much in their head. Claude is the same: the longer a conversation gets, the more tokens it uses just to "remember" what was said.
          </p>
        </div>

        {/* Interactive chat sim */}
        <div className="rounded-2xl overflow-hidden mb-4 shadow-sm" style={{ backgroundColor: 'white' }}>
          <div className="px-5 pt-5 pb-2">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-sm" style={{ color: '#253746' }}>Context window filling up as the conversation grows:</p>
              <span className="text-xs font-semibold" style={{ color: fillColor }}>{totalTokens} / {maxTokens} tokens</span>
            </div>
            {/* Progress bar */}
            <div className="w-full rounded-full h-3 mb-4" style={{ backgroundColor: '#f2e8da' }}>
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{ width: `${fillPct}%`, backgroundColor: fillColor }}
              />
            </div>

            {/* Messages */}
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-1">
              {MESSAGES.slice(0, visible).map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="rounded-2xl px-4 py-2 text-sm max-w-xs"
                    style={{
                      backgroundColor: msg.role === 'user' ? '#253746' : '#f2e8da',
                      color: msg.role === 'user' ? '#f2e8da' : '#253746',
                      border: msg.role === 'assistant' ? '1px solid #e0d5c8' : 'none',
                    }}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs mt-1 opacity-50">{msg.tokens} tokens</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add message button */}
            <div className="flex gap-2">
              {visible < MESSAGES.length && (
                <button
                  onClick={() => setVisible(v => Math.min(v + 2, MESSAGES.length))}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: '#f2e8da', color: '#253746', border: '1.5px solid #253746' }}
                >
                  + Continue conversation
                </button>
              )}
              {visible > 2 && (
                <button
                  onClick={() => setVisible(2)}
                  className="py-2 px-4 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: '#f2e8da', color: '#884933', border: '1.5px solid #884933' }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {fillPct >= 80 && (
            <div className="px-5 py-3 text-sm font-semibold" style={{ backgroundColor: '#884933', color: '#f2e8da' }}>
              ⚠️ Context window nearly full! Claude will start "forgetting" early messages — and you're using lots of tokens.
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: '#253746', color: '#f2e8da' }}>
          <p className="font-bold mb-3">🛠️ How to Keep Your Context Lean</p>
          <div className="space-y-2">
            {[
              { icon: '🆕', tip: 'Start a fresh conversation for each new topic — don\'t reuse old chats for new tasks.' },
              { icon: '✂️', tip: 'Avoid copy-pasting huge documents. Pull out only the relevant section.' },
              { icon: '📋', tip: 'Don\'t paste entire spreadsheets or email threads unless Claude truly needs all of it.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-lg mt-0.5">{item.icon}</span>
                <p style={{ opacity: 0.85, fontSize: '0.9rem' }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onBack}
            className="px-6 py-3 rounded-full font-bold border-2 transition-all hover:scale-105"
            style={{ borderColor: '#253746', color: '#253746' }}>
            ← Back
          </button>
          <button onClick={onNext}
            className="flex-1 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#253746', color: '#f2e8da' }}>
            Next: Prompting Tips →
          </button>
        </div>
      </div>
    </div>
  );
}
