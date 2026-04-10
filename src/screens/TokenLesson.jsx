import { useState } from 'react';

const TOKEN_COLORS = [
  'bg-red-200 text-red-900',
  'bg-amber-200 text-amber-900',
  'bg-yellow-200 text-yellow-900',
  'bg-lime-200 text-lime-900',
  'bg-teal-200 text-teal-900',
  'bg-sky-200 text-sky-900',
  'bg-violet-200 text-violet-900',
  'bg-pink-200 text-pink-900',
];

function tokenize(text) {
  if (!text.trim()) return [];
  const chunks = text.match(/[\w']+|[^\w\s]+|\s+/g) || [];
  const tokens = [];
  let buffer = '';
  for (const chunk of chunks) {
    buffer += chunk;
    const nonSpace = buffer.replace(/\s/g, '');
    if (nonSpace.length >= 4) { tokens.push(buffer); buffer = ''; }
  }
  if (buffer.trim()) tokens.push(buffer);
  return tokens;
}

const EXAMPLES = [
  { label: 'Simple question', text: 'What scent is the cedar body wash?' },
  { label: 'Product description', text: 'Write a 50-word product description for EMJ 2-in-1 Shampoo + Conditioner. Tone: clean, masculine, natural.' },
  { label: 'Rambling ask (costs more!)', text: "Hey Claude, hope you're having a great day! I was wondering if maybe you could possibly help me write something about our new shampoo when you get a chance? It's really fresh smelling and I think people would love it." },
];

const BTN_BASE = {
  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
  fontSize: 15, letterSpacing: '0.04em', border: 'none', cursor: 'pointer',
  borderRadius: 4, transition: 'all 0.15s',
};

export default function TokenLesson({ onNext, onBack }) {
  const [inputText, setInputText] = useState(EXAMPLES[0].text);
  const [activeExample, setActiveExample] = useState(0);

  const tokens = tokenize(inputText);
  const tokenCount = tokens.length;
  const costApprox = (tokenCount * 0.000003).toFixed(5);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f2e8da' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Chapter header */}
        <div className="fade-up" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 24 }}>
          <div className="font-display" style={{
            fontSize: 90, fontWeight: 900, lineHeight: 0.8,
            color: 'rgba(37,55,70,0.09)', letterSpacing: '-5px',
            userSelect: 'none', flexShrink: 0, marginTop: -4,
          }}>01</div>
          <div style={{ flex: 1 }}>
            <span style={{
              display: 'inline-block', fontSize: 9.5, fontWeight: 800, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#253746', backgroundColor: '#79dbd4',
              padding: '3px 10px', borderRadius: 2, marginBottom: 8,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}>Lesson 1 of 4</span>
            <h2 className="font-display" style={{ color: '#253746', fontSize: 32, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.5px' }}>
              WHAT IS A TOKEN?
            </h2>
            <p style={{ color: '#253746', opacity: 0.68, marginTop: 6, fontSize: 14.5, lineHeight: 1.65 }}>
              Claude doesn't read words the way you do. It reads in tiny chunks called <strong>tokens</strong> — about 4 characters, or roughly ¾ of a word.
            </p>
          </div>
        </div>

        {/* Analogy */}
        <div className="fade-up delay-1" style={{ borderLeft: '3px solid #884933', backgroundColor: 'rgba(136,73,51,0.07)', padding: '14px 16px', marginBottom: 16, borderRadius: '0 4px 4px 0' }}>
          <p className="font-display" style={{ color: '#884933', fontSize: 15, fontWeight: 800, marginBottom: 5, letterSpacing: '0.03em' }}>
            🧴 THE BODY WASH ANALOGY
          </p>
          <p style={{ color: '#253746', opacity: 0.78, fontSize: 14, lineHeight: 1.65 }}>
            Imagine reading the ingredient list on our Cedar + Sage Body Wash — but you can only see 4 letters at a time.
            That's exactly how Claude processes your message. Every word costs a tiny bit of your monthly budget.
          </p>
        </div>

        {/* Interactive tokenizer */}
        <div className="fade-up delay-2 card" style={{ marginBottom: 16 }}>
          <div style={{ padding: '16px 16px 12px' }}>
            <p style={{ fontWeight: 600, color: '#253746', marginBottom: 10, fontSize: 14 }}>Try it — type anything below 👇</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => { setInputText(ex.text); setActiveExample(i); }}
                  style={{
                    padding: '5px 11px', borderRadius: 3, fontSize: 11.5, fontWeight: 700,
                    fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.04em',
                    backgroundColor: activeExample === i ? '#253746' : 'transparent',
                    color: activeExample === i ? '#f2e8da' : '#253746',
                    border: '1.5px solid #253746', cursor: 'pointer',
                    transition: 'all 0.12s',
                  }}
                >
                  {ex.label}
                </button>
              ))}
            </div>
            <textarea
              style={{
                width: '100%', padding: '10px 12px', fontSize: 13.5,
                backgroundColor: 'rgba(37,55,70,0.04)', color: '#253746',
                border: '1.5px solid rgba(37,55,70,0.18)', borderRadius: 6,
                minHeight: 80, resize: 'none', outline: 'none', lineHeight: 1.6,
                fontFamily: "'Barlow', sans-serif",
              }}
              value={inputText}
              onChange={e => { setInputText(e.target.value); setActiveExample(-1); }}
              placeholder="Type something about EMJ products..."
            />
          </div>

          <div style={{ padding: '0 16px 14px' }}>
            <p style={{
              fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(37,55,70,0.4)', marginBottom: 8,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}>Tokens highlighted:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, minHeight: 36 }}>
              {tokens.map((tok, i) => (
                <span key={i} className={`prompt-text ${TOKEN_COLORS[i % TOKEN_COLORS.length]}`} style={{ padding: '2px 6px', borderRadius: 3 }}>
                  {tok}
                </span>
              ))}
              {tokens.length === 0 && (
                <span style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(37,55,70,0.35)' }}>Start typing to see tokens...</span>
              )}
            </div>
          </div>

          {/* Counter bar */}
          <div style={{ backgroundColor: '#253746', padding: '14px 16px', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', borderRadius: '0 0 4px 4px' }}>
            <div>
              <div className="font-display" style={{ color: '#ffc56e', fontSize: 36, fontWeight: 900, lineHeight: 1 }}>{tokenCount}</div>
              <div style={{ color: 'rgba(242,232,218,0.45)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>tokens</div>
            </div>
            <div>
              <div className="font-display" style={{ color: '#79dbd4', fontSize: 36, fontWeight: 900, lineHeight: 1 }}>${costApprox}</div>
              <div style={{ color: 'rgba(242,232,218,0.45)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>approx. cost</div>
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <p style={{ color: 'rgba(242,232,218,0.52)', fontSize: 12.5, lineHeight: 1.55 }}>
                Claude Enterprise gives us a monthly token budget shared across all ~70 team members. Every message counts!
              </p>
            </div>
          </div>
        </div>

        {/* Key takeaway */}
        <div className="fade-up delay-3" style={{ backgroundColor: '#4e5a31', color: '#f2e8da', borderRadius: 8, padding: '14px 16px', borderLeft: '4px solid #79dbd4', marginBottom: 16 }}>
          <p className="font-display" style={{ fontWeight: 800, fontSize: 15, marginBottom: 5, letterSpacing: '0.03em' }}>💡 KEY TAKEAWAY</p>
          <p style={{ opacity: 0.88, fontSize: 14, lineHeight: 1.65 }}>
            Both your message <em>and</em> Claude's reply cost tokens. Shorter, more specific messages = lower cost + better answers.
          </p>
        </div>

        {/* MCP section */}
        <div className="fade-up delay-4 card" style={{ marginBottom: 28 }}>
          <div style={{ padding: '12px 16px', backgroundColor: '#253746', display: 'flex', alignItems: 'center', gap: 10, borderRadius: '4px 4px 0 0' }}>
            <span style={{ fontSize: 18 }}>🔌</span>
            <span className="font-display" style={{ color: '#ffc56e', fontSize: 16, fontWeight: 900, letterSpacing: '0.03em' }}>WHAT ABOUT MCPs?</span>
          </div>
          <div style={{ padding: '14px 16px' }}>
            <p style={{ color: '#253746', fontSize: 14, lineHeight: 1.65, marginBottom: 12, opacity: 0.85 }}>
              <strong>MCPs (Model Context Protocols)</strong> are integrations that connect Claude to external tools — like NetSuite, Gmail, Slack, or your database. They let Claude take actions and look things up beyond just text.
            </p>
            <p style={{ color: '#253746', fontSize: 14, lineHeight: 1.65, marginBottom: 14, opacity: 0.85 }}>
              The catch: <strong>every MCP you have enabled injects its full tool description into your context window at the start of every conversation</strong> — even when you're not using it.
            </p>

            {/* Setup scenario */}
            <div style={{ backgroundColor: '#f8f4ef', borderRadius: 6, padding: '11px 13px', marginBottom: 14, border: '1.5px solid rgba(37,55,70,0.12)' }}>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: '#253746' }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(37,55,70,0.45)', display: 'block', marginBottom: 4 }}>The scenario</span>
                You open Claude and type: <em style={{ color: '#253746' }}>"Write a subject line for our spring email."</em><br/>
                You forgot the <strong>NetSuite MCP is still enabled</strong> from earlier.
              </p>
            </div>

            {/* Side by side comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {/* With MCP */}
              <div style={{ borderRadius: 6, overflow: 'hidden', border: '1.5px solid rgba(136,73,51,0.35)' }}>
                <div style={{ backgroundColor: '#884933', padding: '7px 10px' }}>
                  <p className="font-display" style={{ color: '#f2e8da', fontSize: 13, fontWeight: 900, letterSpacing: '0.04em' }}>❌ NETSUITE MCP ON</p>
                  <p style={{ color: 'rgba(242,232,218,0.65)', fontSize: 10 }}>(you forgot to disable it)</p>
                </div>
                <div style={{ padding: '10px', backgroundColor: 'rgba(136,73,51,0.04)' }}>
                  {[
                    { label: 'MCP tools injected', tokens: '~970', sub: 'NetSuite overhead — before you type' },
                    { label: 'Your message', tokens: '9', sub: '"Write a spring email subject line"' },
                    { label: "Claude's reply", tokens: '~80', sub: '5 subject line options' },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 600, color: '#253746', lineHeight: 1.2 }}>{row.label}</div>
                        <div style={{ fontSize: 10, color: 'rgba(37,55,70,0.45)', lineHeight: 1.2 }}>{row.sub}</div>
                      </div>
                      <div className="font-display" style={{ fontSize: 14, fontWeight: 900, color: '#884933', marginLeft: 6, flexShrink: 0 }}>{row.tokens}</div>
                    </div>
                  ))}
                  <div style={{ borderTop: '1.5px solid rgba(136,73,51,0.2)', paddingTop: 7, marginTop: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#884933', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase' }}>Total</span>
                    <span className="font-display" style={{ fontSize: 22, fontWeight: 900, color: '#884933' }}>~1,059</span>
                  </div>
                </div>
              </div>

              {/* Without MCP */}
              <div style={{ borderRadius: 6, overflow: 'hidden', border: '1.5px solid rgba(78,90,49,0.4)' }}>
                <div style={{ backgroundColor: '#4e5a31', padding: '7px 10px' }}>
                  <p className="font-display" style={{ color: '#f2e8da', fontSize: 13, fontWeight: 900, letterSpacing: '0.04em' }}>✅ NETSUITE MCP OFF</p>
                  <p style={{ color: 'rgba(242,232,218,0.65)', fontSize: 10 }}>(disabled — not needed)</p>
                </div>
                <div style={{ padding: '10px', backgroundColor: 'rgba(78,90,49,0.04)' }}>
                  {[
                    { label: 'MCP tools injected', tokens: '0', sub: 'Nothing injected — MCP is off' },
                    { label: 'Your message', tokens: '9', sub: '"Write a spring email subject line"' },
                    { label: "Claude's reply", tokens: '~80', sub: '5 subject line options' },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 600, color: '#253746', lineHeight: 1.2 }}>{row.label}</div>
                        <div style={{ fontSize: 10, color: 'rgba(37,55,70,0.45)', lineHeight: 1.2 }}>{row.sub}</div>
                      </div>
                      <div className="font-display" style={{ fontSize: 14, fontWeight: 900, color: '#4e5a31', marginLeft: 6, flexShrink: 0 }}>{row.tokens}</div>
                    </div>
                  ))}
                  <div style={{ borderTop: '1.5px solid rgba(78,90,49,0.2)', paddingTop: 7, marginTop: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#4e5a31', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase' }}>Total</span>
                    <span className="font-display" style={{ fontSize: 22, fontWeight: 900, color: '#4e5a31' }}>~89</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Punchline */}
            <div style={{ backgroundColor: '#253746', borderRadius: 6, padding: '10px 12px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="font-display" style={{ fontSize: 28, fontWeight: 900, color: '#ffc56e', flexShrink: 0, lineHeight: 1 }}>12×</div>
              <p style={{ fontSize: 13, color: 'rgba(242,232,218,0.82)', lineHeight: 1.5 }}>
                More expensive — for a task that has <strong style={{ color: '#f2e8da' }}>nothing to do with NetSuite</strong>. Same output. 970 wasted tokens every time.
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(37,55,70,0.08)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
              <p className="font-display" style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', color: 'rgba(37,55,70,0.5)', textTransform: 'uppercase', marginBottom: 2 }}>Best Practices</p>
              {[
                { icon: '✅', text: 'Disable MCPs you\'re not actively using in that session' },
                { icon: '✅', text: 'Turn on the NetSuite MCP only when your task involves NetSuite' },
                { icon: '❌', text: "Don't leave 5 MCPs running for a simple copywriting task" },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, lineHeight: 1.5 }}>
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: '#253746', opacity: 0.8 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="fade-up delay-5" style={{ display: 'flex', gap: 10 }}>
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
            NEXT: THE CONTEXT WINDOW →
          </button>
        </div>
      </div>
    </div>
  );
}
