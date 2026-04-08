import { useState } from 'react';

const QUESTIONS = [
  {
    q: "You need Claude to write a product description for EMJ's new Sandalwood Face Wash. Which prompt uses fewer tokens AND gets a better result?",
    options: [
      "Hey Claude! I hope you're having a great Wednesday. Could you possibly help me out with something? We have this new face wash with sandalwood in it and I need a product description. Nothing too long, just something nice.",
      "Write a 60-word product description for EMJ Sandalwood Face Wash. Tone: clean, masculine, natural. Highlight: deep-cleansing, skin-balancing.",
      "Write a product description.",
      "Can you write something about face wash?"
    ],
    correct: 1,
    explanation: "Option B uses ~25 tokens and gives Claude everything it needs: product, length, tone, and key benefits. No fluff needed!"
  },
  {
    q: "Your conversation with Claude is getting really long — you've been going back and forth about EMJ's fall campaign for 30 messages. What should you do?",
    options: [
      "Keep going — the longer the conversation, the more Claude learns about EMJ.",
      "Start a fresh conversation. Long chats burn more tokens and Claude may start 'forgetting' early context.",
      "Paste the entire conversation into a new message so Claude remembers everything.",
      "Upload your entire email history for better context."
    ],
    correct: 1,
    explanation: "Fresh conversations are cheaper. Long threads fill up your context window — and Claude still has to 'read' all prior messages with each new response."
  },
  {
    q: "What is a 'token' in Claude's world?",
    options: [
      "One complete sentence.",
      "One word, exactly.",
      "A small chunk of text — roughly 4 characters, or about ¾ of a word.",
      "One paragraph of text."
    ],
    correct: 2,
    explanation: "Tokens are tiny text chunks — about 4 characters each. 'body wash' ≈ 3 tokens. Both your message AND Claude's reply count toward your usage."
  },
  {
    q: "You need Claude to help with three things: a subject line, email body, and social caption for the new Activated Charcoal Body Wash launch. What's the best approach?",
    options: [
      "Three separate conversations — one for each task.",
      "Ask all three in one message: 'Write: 1) subject line options, 2) 150-word email body, 3) Instagram caption for our Activated Charcoal Body Wash launch.'",
      "Ask one at a time, re-explaining the product each time.",
      "Skip Claude — it'll use too many tokens."
    ],
    correct: 1,
    explanation: "Batching related tasks in one conversation is much more efficient. You set the context once and Claude handles all three tasks together."
  },
  {
    q: "You want Claude to always know EMJ's brand voice without having to explain it every single time. What's the best solution?",
    options: [
      "Start every message with a 200-word brand description.",
      "Hope Claude remembers from last week's chat.",
      "Use a Claude Project and save your brand context there — Claude will reference it automatically.",
      "Tokens are cheap, just paste it every time."
    ],
    correct: 2,
    explanation: "Claude Projects let you save persistent context — brand voice, product info, tone guidelines. Set it once and stop paying tokens to re-explain yourself."
  }
];

export default function Quiz({ onNext, onBack }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = QUESTIONS[current];

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.correct;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { correct }]);
  };

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const badge = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
    const msg = pct >= 80 ? 'Token Pro!' : pct >= 60 ? 'Getting There!' : 'Keep Practicing!';

    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f2e8da' }}>
        <div className="max-w-md mx-auto px-4 py-10 text-center">
          <div className="text-7xl mb-4">{badge}</div>
          <h2 className="text-3xl font-black mb-2" style={{ color: '#253746' }}>{msg}</h2>
          <div className="text-6xl font-black my-4" style={{ color: '#884933' }}>{score}/{QUESTIONS.length}</div>
          <p className="mb-8" style={{ color: '#253746', opacity: 0.75 }}>
            {pct >= 80
              ? "You're ready to help EMJ use Claude efficiently. Share what you learned!"
              : "Review the tips section and try again — or just keep these habits in mind as you use Claude."}
          </p>

          {/* Score breakdown */}
          <div className="flex gap-2 justify-center mb-8">
            {answers.map((a, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: a.correct ? '#79dbd4' : '#884933', color: '#253746' }}
              >
                {a.correct ? '✓' : '✗'}
              </div>
            ))}
          </div>

          <button onClick={onNext}
            className="w-full py-4 rounded-full font-black text-lg transition-all hover:scale-105 active:scale-95 mb-3"
            style={{ backgroundColor: '#253746', color: '#f2e8da' }}>
            See My Tips Summary →
          </button>
          <button onClick={onBack}
            className="w-full py-3 rounded-full font-semibold border-2 transition-all"
            style={{ borderColor: '#253746', color: '#253746' }}>
            ← Review Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f2e8da' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">

        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: '#571a20', color: '#f2e8da' }}>
            Quiz — Question {current + 1} of {QUESTIONS.length}
          </span>
          <div className="w-full rounded-full h-2 mb-6" style={{ backgroundColor: 'rgba(37,55,70,0.15)' }}>
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: `${((current) / QUESTIONS.length) * 100}%`, backgroundColor: '#884933' }}
            />
          </div>
          <h2 className="text-xl font-black leading-snug" style={{ color: '#253746' }}>
            {q.q}
          </h2>
        </div>

        <div className="space-y-3 mb-6">
          {q.options.map((opt, i) => {
            let bg = 'white';
            let border = '1.5px solid rgba(37,55,70,0.15)';
            let textColor = '#253746';

            if (answered) {
              if (i === q.correct) { bg = '#79dbd4'; border = '2px solid #4e5a31'; }
              else if (i === selected && selected !== q.correct) { bg = '#884933'; border = '2px solid #571a20'; textColor = '#f2e8da'; }
              else { bg = 'white'; textColor = 'rgba(37,55,70,0.4)'; }
            } else if (selected === i) {
              bg = '#f2e8da';
              border = '2px solid #253746';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className="w-full text-left px-5 py-4 rounded-2xl transition-all duration-200 text-sm leading-relaxed"
                style={{ backgroundColor: bg, border, color: textColor, cursor: answered ? 'default' : 'pointer' }}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className="rounded-2xl p-4 mb-6 text-sm"
            style={{
              backgroundColor: selected === q.correct ? '#4e5a31' : '#571a20',
              color: '#f2e8da'
            }}
          >
            <p className="font-bold mb-1">{selected === q.correct ? '✅ Correct!' : '❌ Not quite.'}</p>
            <p style={{ opacity: 0.9 }}>{q.explanation}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onBack}
            className="px-6 py-3 rounded-full font-bold border-2 transition-all"
            style={{ borderColor: '#253746', color: '#253746' }}>
            ← Back
          </button>
          {answered && (
            <button onClick={handleNext}
              className="flex-1 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#253746', color: '#f2e8da' }}>
              {current + 1 >= QUESTIONS.length ? 'See Results →' : 'Next Question →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
