import { useState } from 'react';

const QUESTIONS = [
  {
    q: "You need Claude to write a product description for EMJ's new Sandalwood Face Wash. Which prompt uses fewer tokens AND gets a better result?",
    options: [
      "Hey Claude! I hope you're having a great Wednesday. Could you possibly help me out with something? We have this new face wash with sandalwood in it and I need a product description. Nothing too long, just something nice.",
      "Write a 60-word product description for EMJ Sandalwood Face Wash. Tone: clean, masculine, natural. Highlight: deep-cleansing, skin-balancing.",
      "Write a product description.",
      "Can you write something about face wash?",
    ],
    correct: 1,
    explanation: "Option B uses ~25 tokens and gives Claude everything it needs: product, length, tone, and key benefits. No fluff needed!",
  },
  {
    q: "Your conversation with Claude is getting really long — you've been going back and forth about EMJ's fall campaign for 30 messages. What should you do?",
    options: [
      "Keep going — the longer the conversation, the more Claude learns about EMJ.",
      "Start a fresh conversation. Long chats burn more tokens and Claude may start 'forgetting' early context.",
      "Paste the entire conversation into a new message so Claude remembers everything.",
      "Upload your entire email history for better context.",
    ],
    correct: 1,
    explanation: "Fresh conversations are cheaper. Long threads fill up your context window — and Claude still has to 'read' all prior messages with each new response.",
  },
  {
    q: "What is a 'token' in Claude's world?",
    options: [
      "One complete sentence.",
      "One word, exactly.",
      "A small chunk of text — roughly 4 characters, or about ¾ of a word.",
      "One paragraph of text.",
    ],
    correct: 2,
    explanation: "Tokens are tiny text chunks — about 4 characters each. 'body wash' ≈ 3 tokens. Both your message AND Claude's reply count toward your usage.",
  },
  {
    q: "You need Claude to help with three things: a subject line, email body, and social caption for the new Activated Charcoal Body Wash launch. What's the best approach?",
    options: [
      "Three separate conversations — one for each task.",
      "Ask all three in one message: 'Write: 1) subject line options, 2) 150-word email body, 3) Instagram caption for our Activated Charcoal Body Wash launch.'",
      "Ask one at a time, re-explaining the product each time.",
      "Skip Claude — it'll use too many tokens.",
    ],
    correct: 1,
    explanation: "Batching related tasks in one conversation is much more efficient. You set the context once and Claude handles all three tasks together.",
  },
  {
    q: "You need to find feedback on EMJ's new deodorant from the past year. You ask Claude to scan your Gmail and read every email mentioning 'deodorant' — about 80 emails. What's the real concern here?",
    options: [
      "Gmail integration only works for the last 30 days.",
      "Reading 80 emails (~350 tokens each) burns ~28,000 tokens — the same as writing nearly 1,000 product descriptions — before Claude types a single word back.",
      "Claude will reply too slowly when reading emails.",
      "You'd need a paid Gmail add-on for this to work.",
    ],
    correct: 1,
    explanation: "File and email searches are the hidden budget killers. A single Gmail scan can cost more tokens than weeks of normal prompts. Find the relevant emails yourself and paste only the key ones — or just the quotes that matter.",
  },
  {
    q: "You want Claude to always know EMJ's brand voice without having to explain it every single time. What's the best solution?",
    options: [
      "Start every message with a 200-word brand description.",
      "Hope Claude remembers from last week's chat.",
      "Use a Claude Project and save your brand context there — Claude will reference it automatically.",
      "Tokens are cheap, just paste it every time.",
    ],
    correct: 2,
    explanation: "Claude Projects let you save persistent context — brand voice, product info, tone guidelines. Set it once and stop paying tokens to re-explain yourself.",
  },
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
    const msg = pct >= 80 ? 'TOKEN PRO!' : pct >= 60 ? 'GETTING THERE!' : 'KEEP PRACTICING!';

    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#253746' }}>
        <div style={{ maxWidth: 400, width: '100%', padding: '48px 24px', textAlign: 'center' }} className="fade-up">
          <div style={{ fontSize: 56, marginBottom: 12 }}>{badge}</div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffc56e', fontSize: 34, fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 6 }}>
            {msg}
          </h2>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#79dbd4', fontSize: 60, fontWeight: 900, lineHeight: 1, margin: '14px 0' }}>
            {score}/{QUESTIONS.length}
          </div>
          <p style={{ color: 'rgba(242,232,218,0.6)', fontSize: 14.5, lineHeight: 1.7, marginBottom: 28 }}>
            {pct >= 80
              ? "You're ready to help EMJ use Claude efficiently. Share what you learned!"
              : "Review the tips section and try again — or just keep these habits in mind as you use Claude."}
          </p>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
            {answers.map((a, i) => (
              <div key={i} style={{
                width: 38, height: 38, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 15,
                backgroundColor: a.correct ? '#79dbd4' : '#884933',
                color: a.correct ? '#253746' : '#f2e8da',
              }}>
                {a.correct ? '✓' : '✗'}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={onNext}
              className="transition-all hover:opacity-90 active:scale-95"
              style={{
                width: '100%', padding: '13px 20px', borderRadius: 4, border: 'none', cursor: 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: '0.06em',
                backgroundColor: '#ffc56e', color: '#253746',
              }}
            >
              SEE MY TIPS SUMMARY →
            </button>
            <button
              onClick={onBack}
              className="transition-all hover:opacity-70"
              style={{
                width: '100%', padding: '11px 20px', borderRadius: 4, cursor: 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.06em',
                backgroundColor: 'transparent', color: 'rgba(242,232,218,0.4)',
                border: '2px solid rgba(242,232,218,0.15)',
              }}
            >
              ← REVIEW LESSONS
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#253746' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 48px' }}>

        <div style={{ marginBottom: 24 }} className="fade-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#f2e8da', backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '3px 10px', borderRadius: 2,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}>
              Question {current + 1} of {QUESTIONS.length}
            </span>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: 'rgba(242,232,218,0.28)', fontSize: 20, fontWeight: 900 }}>
              {score} / {current + (answered ? 1 : 0)}
            </div>
          </div>
          <div style={{ width: '100%', borderRadius: 2, height: 3, backgroundColor: 'rgba(255,255,255,0.08)', marginBottom: 20 }}>
            <div style={{
              height: '100%', borderRadius: 2,
              width: `${(current / QUESTIONS.length) * 100}%`,
              backgroundColor: '#79dbd4', transition: 'width 0.4s ease',
            }} />
          </div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#f2e8da', fontSize: 20, fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.2px' }}>
            {q.q}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }} className="fade-up delay-1">
          {q.options.map((opt, i) => {
            let bg = 'rgba(255,255,255,0.05)';
            let border = '1px solid rgba(255,255,255,0.1)';
            let textColor = 'rgba(242,232,218,0.82)';

            if (answered) {
              if (i === q.correct) { bg = '#79dbd4'; border = '2px solid #4e5a31'; textColor = '#253746'; }
              else if (i === selected && selected !== q.correct) { bg = '#884933'; border = '2px solid rgba(136,73,51,0.5)'; textColor = '#f2e8da'; }
              else { bg = 'rgba(255,255,255,0.02)'; textColor = 'rgba(242,232,218,0.22)'; border = '1px solid rgba(255,255,255,0.05)'; }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className="transition-all duration-200 text-left"
                style={{
                  backgroundColor: bg, border, color: textColor,
                  cursor: answered ? 'default' : 'pointer',
                  borderRadius: 4, padding: '12px 14px', fontSize: 13.5, lineHeight: 1.55,
                  width: '100%', textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 15, marginRight: 8 }}>
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="fade-up" style={{
            padding: '14px 16px', borderRadius: 4, marginBottom: 20,
            backgroundColor: selected === q.correct ? '#4e5a31' : 'rgba(136,73,51,0.5)',
            border: `1px solid ${selected === q.correct ? '#79dbd4' : 'rgba(136,73,51,0.6)'}`,
            color: '#f2e8da',
          }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, marginBottom: 5 }}>
              {selected === q.correct ? '✅ Correct!' : '❌ Not quite.'}
            </p>
            <p style={{ opacity: 0.88, fontSize: 13.5, lineHeight: 1.6 }}>{q.explanation}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onBack}
            className="transition-all hover:opacity-70"
            style={{
              padding: '11px 20px', borderRadius: 4, cursor: 'pointer',
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.06em',
              backgroundColor: 'transparent', color: 'rgba(242,232,218,0.5)',
              border: '2px solid rgba(242,232,218,0.15)',
            }}
          >
            ← BACK
          </button>
          {answered && (
            <button
              onClick={handleNext}
              className="transition-all hover:opacity-90 active:scale-95"
              style={{
                flex: 1, padding: '11px 20px', borderRadius: 4, border: 'none', cursor: 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.06em',
                backgroundColor: '#79dbd4', color: '#253746',
              }}
            >
              {current + 1 >= QUESTIONS.length ? 'SEE RESULTS →' : 'NEXT QUESTION →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
