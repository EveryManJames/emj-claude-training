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
    if (nonSpace.length >= 4) {
      tokens.push(buffer);
      buffer = '';
    }
  }
  if (buffer.trim()) tokens.push(buffer);
  return tokens;
}

const TALE_TEXT = "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way.";

const TALE_TOKENS = tokenize(TALE_TEXT);

const REAL_WORLD_DATA = [
  { label: 'Your prompt', description: '"Write a product description for Cedar Body Wash"', tokens: 30, color: '#79dbd4' },
  { label: "Claude's reply", description: '60-word product description', tokens: 220, color: '#79dbd4' },
  { label: '1 typical work email', description: 'A standard email (~250 words)', tokens: 350, color: '#ffc56e' },
  { label: '1 Google Drive doc', description: '10-page strategy or campaign brief', tokens: 3500, color: '#ffc56e' },
  { label: 'Gmail search: 50 emails', description: 'Claude reads every matching result to find what you need', tokens: 17500, color: '#884933' },
  { label: 'Drive scan: 20 docs', description: '"Find anything about our 2023 campaign"', tokens: 70000, color: '#884933' },
];

export default function TokenLesson({ onNext, onBack }) {
  const tokenCount = TALE_TOKENS.length;
  const costApprox = (tokenCount * 0.000003).toFixed(5);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f2e8da' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 48px' }}>

        <div style={{ marginBottom: 28 }}>
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#253746', backgroundColor: '#79dbd4',
            padding: '3px 10px', borderRadius: 2, marginBottom: 12,
            fontFamily: "'Barlow Condensed', sans-serif",
          }}>
            Lesson 1 of 4
          </span>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: '#253746', fontSize: 28, fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.5px', marginBottom: 8,
          }}>
            What is a Token? 🔤
          </h2>
          <p style={{ color: 'rgba(37,55,70,0.7)', fontSize: 14.5, lineHeight: 1.65 }}>
            Claude doesn't read words the way you do. It reads in tiny chunks called <strong>tokens</strong>.
            Think of a token as about 4 characters — roughly ¾ of a word.
          </p>
        </div>

        <div style={{
          borderLeft: '3px solid #884933', backgroundColor: 'rgba(136,73,51,0.06)',
          padding: '14px 16px', marginBottom: 20, borderRadius: '0 4px 4px 0',
        }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, color: '#884933', marginBottom: 5 }}>
            🧴 The Body Wash Analogy
          </p>
          <p style={{ color: 'rgba(37,55,70,0.75)', fontSize: 14, lineHeight: 1.65 }}>
            Imagine you're reading the ingredient list on the back of our Cedar + Sage Body Wash —
            but you can only see 4 letters at a time. That's exactly how Claude processes your message.
            Every word costs a tiny bit of your monthly budget.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: 6, border: '1px solid rgba(37,55,70,0.09)', marginBottom: 20 }}>
          <div style={{ padding: '16px 18px 14px' }}>
            <p style={{ fontWeight: 700, color: '#253746', fontSize: 13.5, marginBottom: 4 }}>
              This is how Claude "reads" the opening of <em>A Tale of Two Cities</em>:
            </p>
            <p style={{ fontSize: 12.5, color: 'rgba(37,55,70,0.5)', marginBottom: 14, lineHeight: 1.5 }}>
              Each colored block is one token — about 4 characters. Even a sentence you know by heart looks like this to Claude.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {TALE_TOKENS.map((tok, i) => (
                <span
                  key={i}
                  className={`px-1.5 py-0.5 rounded text-xs font-mono ${TOKEN_COLORS[i % TOKEN_COLORS.length]}`}
                >
                  {tok}
                </span>
              ))}
            </div>
          </div>

          <div style={{ padding: '14px 18px', display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#253746', borderRadius: '0 0 6px 6px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: '#ffc56e', lineHeight: 1 }}>{tokenCount}</div>
              <div style={{ fontSize: 10, color: 'rgba(242,232,218,0.5)', marginTop: 2, letterSpacing: '0.04em', fontFamily: "'Barlow Condensed', sans-serif" }}>tokens</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: '#79dbd4', lineHeight: 1 }}>${costApprox}</div>
              <div style={{ fontSize: 10, color: 'rgba(242,232,218,0.5)', marginTop: 2, letterSpacing: '0.04em', fontFamily: "'Barlow Condensed', sans-serif" }}>approx. cost</div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: 'rgba(242,232,218,0.55)', lineHeight: 1.55 }}>
                Claude Enterprise gives us a monthly token budget shared across all ~70 team members. Every message counts!
              </p>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 6, border: '1px solid rgba(37,55,70,0.09)', marginBottom: 20 }}>
          <div style={{ padding: '16px 18px 14px', borderBottom: '1px solid rgba(37,55,70,0.07)' }}>
            <p style={{ fontWeight: 700, color: '#253746', fontSize: 14, marginBottom: 4 }}>📊 Your prompt is just the tip of the iceberg</p>
            <p style={{ fontSize: 13, color: 'rgba(37,55,70,0.6)', lineHeight: 1.6 }}>
              The real token cost happens when Claude has to <em>read through your files</em> — emails, documents, entire Drive folders.
              Your prompt is a rounding error compared to that.
            </p>
          </div>
          <div style={{ padding: '16px 18px' }}>
            {REAL_WORLD_DATA.map((item, i) => (
              <div key={i} style={{ marginBottom: i < REAL_WORLD_DATA.length - 1 ? 14 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#253746' }}>{item.label}</span>
                  <span style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: item.color }}>
                    ~{item.tokens.toLocaleString()} tokens
                  </span>
                </div>
                <p style={{ fontSize: 11.5, color: 'rgba(37,55,70,0.45)', marginBottom: 6 }}>{item.description}</p>
                <div style={{ width: '100%', borderRadius: 3, height: 6, backgroundColor: '#f2e8da' }}>
                  <div style={{
                    height: 6, borderRadius: 3,
                    width: `${Math.min(100, Math.max(3, (Math.log10(item.tokens) / Math.log10(70000)) * 100))}%`,
                    backgroundColor: item.color,
                    transition: 'width 0.3s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 18px', backgroundColor: '#884933', borderRadius: '0 0 6px 6px' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#f2e8da', lineHeight: 1.55 }}>
              ⚠️ Asking Claude to search 50 Gmail threads costs{' '}
              <span style={{ color: '#ffc56e' }}>~580× more tokens than your prompt</span>
              {' '}— before it writes a single word back to you.
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#4e5a31', color: '#f2e8da',
          padding: '14px 16px', marginBottom: 28, borderLeft: '3px solid #79dbd4',
          borderRadius: '0 6px 6px 0',
        }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, marginBottom: 5 }}>💡 Key Takeaway</p>
          <p style={{ opacity: 0.88, fontSize: 14, lineHeight: 1.65 }}>
            Both your message <em>and</em> Claude's reply cost tokens — but the biggest hidden cost is what Claude has to <em>read</em>. Don't send Claude on a file hunt when you can paste the relevant piece yourself.
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
            NEXT: THE CONTEXT WINDOW →
          </button>
        </div>
      </div>
    </div>
  );
}
