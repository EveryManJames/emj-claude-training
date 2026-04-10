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

// Rough tokenizer: split on word/punctuation boundaries, ~3-5 chars per token
function tokenize(text) {
  if (!text.trim()) return [];
  // Split into words and punctuation
  const chunks = text.match(/[\w']+|[^\w\s]+|\s+/g) || [];
  const tokens = [];
  let buffer = '';
  for (const chunk of chunks) {
    buffer += chunk;
    // Roughly break at 4 chars of non-whitespace content
    const nonSpace = buffer.replace(/\s/g, '');
    if (nonSpace.length >= 4) {
      tokens.push(buffer);
      buffer = '';
    }
  }
  if (buffer.trim()) tokens.push(buffer);
  return tokens;
}

const REAL_WORLD_DATA = [
  {
    label: 'Your prompt',
    description: '"Write a product description for Cedar Body Wash"',
    tokens: 30,
    color: '#79dbd4',
  },
  {
    label: "Claude's reply",
    description: '60-word product description',
    tokens: 220,
    color: '#79dbd4',
  },
  {
    label: '1 typical work email',
    description: 'A standard email (~250 words)',
    tokens: 350,
    color: '#ffc56e',
  },
  {
    label: '1 Google Drive doc',
    description: '10-page strategy or campaign brief',
    tokens: 3500,
    color: '#ffc56e',
  },
  {
    label: 'Gmail search: 50 emails',
    description: 'Claude reads every matching result to find what you need',
    tokens: 17500,
    color: '#884933',
  },
  {
    label: 'Drive scan: 20 docs',
    description: '"Find anything about our 2023 campaign"',
    tokens: 70000,
    color: '#884933',
  },
];

const EXAMPLES = [
  {
    label: "A simple question",
    text: "What scent is the cedar body wash?",
  },
  {
    label: "A product description request",
    text: "Write a 50-word product description for EMJ 2-in-1 Shampoo + Conditioner. Tone: clean, masculine, natural.",
  },
  {
    label: "A rambling ask (costs more!)",
    text: "Hey Claude, hope you're having a great day! I was wondering if maybe you could possibly help me write something about our new shampoo when you get a chance? It's really fresh smelling and I think people would love it.",
  },
];

export default function TokenLesson({ onNext, onBack }) {
  const [inputText, setInputText] = useState(EXAMPLES[0].text);
  const [activeExample, setActiveExample] = useState(0);

  const tokens = tokenize(inputText);
  const tokenCount = tokens.length;
  const costApprox = (tokenCount * 0.000003).toFixed(5);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f2e8da' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: '#79dbd4', color: '#253746' }}>
            Lesson 1 of 4
          </span>
          <h2 className="text-3xl font-black mb-2" style={{ color: '#253746' }}>
            What is a Token? 🔤
          </h2>
          <p style={{ color: '#253746', opacity: 0.75 }}>
            Claude doesn't read words the way you do. It reads in tiny chunks called <strong>tokens</strong>.
            Think of a token as about 4 characters — roughly ¾ of a word.
          </p>
        </div>

        {/* Visual analogy */}
        <div className="rounded-2xl p-5 mb-6 border-l-4" style={{ backgroundColor: 'white', borderColor: '#884933' }}>
          <p className="font-bold mb-1" style={{ color: '#884933' }}>🧴 The Body Wash Analogy</p>
          <p style={{ color: '#253746', opacity: 0.8, fontSize: '0.95rem' }}>
            Imagine you're reading the ingredient list on the back of our Cedar + Sage Body Wash —
            but you can only see 4 letters at a time. That's exactly how Claude processes your message.
            Every word costs a tiny bit of your monthly budget.
          </p>
        </div>

        {/* Interactive tokenizer */}
        <div className="rounded-2xl overflow-hidden mb-6 shadow-sm" style={{ backgroundColor: 'white' }}>
          <div className="px-5 pt-5 pb-3">
            <p className="font-bold mb-3" style={{ color: '#253746' }}>Try it — type anything below 👇</p>
            {/* Quick examples */}
            <div className="flex flex-wrap gap-2 mb-3">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => { setInputText(ex.text); setActiveExample(i); }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: activeExample === i ? '#253746' : '#f2e8da',
                    color: activeExample === i ? '#f2e8da' : '#253746',
                    border: '1px solid #253746',
                  }}
                >
                  {ex.label}
                </button>
              ))}
            </div>
            <textarea
              className="w-full rounded-xl p-3 text-sm resize-none outline-none"
              style={{ backgroundColor: '#f2e8da', color: '#253746', border: '1.5px solid #253746', minHeight: 80 }}
              value={inputText}
              onChange={e => { setInputText(e.target.value); setActiveExample(-1); }}
              placeholder="Type something about EMJ products..."
            />
          </div>

          {/* Token visualization */}
          <div className="px-5 pb-4">
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(37,55,70,0.5)' }}>
              Tokens highlighted:
            </p>
            <div className="flex flex-wrap gap-1 min-h-10">
              {tokens.map((tok, i) => (
                <span
                  key={i}
                  className={`px-1.5 py-0.5 rounded text-xs font-mono ${TOKEN_COLORS[i % TOKEN_COLORS.length]}`}
                >
                  {tok}
                </span>
              ))}
              {tokens.length === 0 && (
                <span className="text-sm italic" style={{ color: 'rgba(37,55,70,0.4)' }}>Start typing to see tokens...</span>
              )}
            </div>
          </div>

          {/* Counter */}
          <div className="px-5 py-4 flex gap-4 flex-wrap" style={{ backgroundColor: '#253746' }}>
            <div className="text-center">
              <div className="text-2xl font-black" style={{ color: '#ffc56e' }}>{tokenCount}</div>
              <div className="text-xs" style={{ color: 'rgba(242,232,218,0.6)' }}>tokens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black" style={{ color: '#79dbd4' }}>${costApprox}</div>
              <div className="text-xs" style={{ color: 'rgba(242,232,218,0.6)' }}>approx. cost</div>
            </div>
            <div className="flex-1 flex items-center">
              <p className="text-xs" style={{ color: 'rgba(242,232,218,0.6)' }}>
                Claude Enterprise gives us a monthly token budget shared across all ~70 team members. Every message counts!
              </p>
            </div>
          </div>
        </div>

        {/* Real-World Scale */}
        <div className="rounded-2xl overflow-hidden mb-6 shadow-sm" style={{ backgroundColor: 'white' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: '#e8ddd0' }}>
            <p className="font-bold" style={{ color: '#253746' }}>📊 Your prompt is just the tip of the iceberg</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(37,55,70,0.65)' }}>
              The real token cost happens when Claude has to <em>read through your files</em> — emails, documents, entire Drive folders.
              Your prompt is a rounding error compared to that.
            </p>
          </div>
          <div className="px-5 py-5">
            {REAL_WORLD_DATA.map((item, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-sm font-semibold" style={{ color: '#253746' }}>{item.label}</span>
                  <span className="text-xs font-mono font-bold" style={{ color: item.color }}>
                    ~{item.tokens.toLocaleString()} tokens
                  </span>
                </div>
                <p className="text-xs mb-1.5" style={{ color: 'rgba(37,55,70,0.5)' }}>{item.description}</p>
                <div className="w-full rounded-full h-2" style={{ backgroundColor: '#f2e8da' }}>
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.min(100, Math.max(3, (Math.log10(item.tokens) / Math.log10(70000)) * 100))}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-4" style={{ backgroundColor: '#884933' }}>
            <p className="text-sm font-bold" style={{ color: '#f2e8da' }}>
              ⚠️ Asking Claude to search 50 Gmail threads costs{' '}
              <span style={{ color: '#ffc56e' }}>~580× more tokens than your prompt</span>
              {' '}— before it writes a single word back to you.
            </p>
          </div>
        </div>

        {/* Key takeaway */}
        <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: '#4e5a31', color: '#f2e8da' }}>
          <p className="font-bold mb-1">💡 Key Takeaway</p>
          <p style={{ opacity: 0.9 }}>
            Both your message <em>and</em> Claude's reply cost tokens — but the biggest hidden cost is what Claude has to <em>read</em>. Don't send Claude on a file hunt when you can paste the relevant piece yourself.
          </p>
        </div>

        {/* Nav */}
        <div className="flex gap-3">
          <button onClick={onBack}
            className="px-6 py-3 rounded-full font-bold border-2 transition-all hover:scale-105"
            style={{ borderColor: '#253746', color: '#253746' }}>
            ← Back
          </button>
          <button onClick={onNext}
            className="flex-1 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#253746', color: '#f2e8da' }}>
            Next: The Context Window →
          </button>
        </div>
      </div>
    </div>
  );
}
