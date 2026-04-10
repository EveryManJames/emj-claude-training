import { useState } from 'react';

const TIPS = [
  {
    id: 'context',
    icon: '🗺️',
    title: 'Set the Scene First',
    color: '#79dbd4',
    bad: {
      label: '❌ No Context',
      text: 'Write a product description.',
      note: "Claude doesn't know your brand, your audience, or what \"good\" looks like to you. You'll get something generic."
    },
    good: {
      label: '✅ Context Included',
      text: "I work at Every Man Jack, a men's grooming brand. Our audience is guys 25–45 who care about natural ingredients. Write a 50-word product description for our new Sandalwood Face Wash. Tone: clean, confident, no-frills.",
      note: 'Claude now knows who you are, who you\'re writing for, and what "good" means. The output will actually be usable.'
    }
  },
  {
    id: 'format',
    icon: '📐',
    title: 'Say Exactly What You Want Back',
    color: '#ffc56e',
    bad: {
      label: '❌ Vague Output Request',
      text: 'Can you help me with our spring email campaign?',
      note: 'Claude might write a full strategy document when you just needed a subject line. Be explicit.'
    },
    good: {
      label: '✅ Format Specified',
      text: 'Write 5 subject line options for our spring email campaign. Each should be under 8 words. Tone: playful but not cheesy. Focus on our new Cedar + Citrus scent.',
      note: 'You told Claude: what to make, how many, how long, the tone, and the focus. Now Claude can nail it on the first try.'
    }
  },
  {
    id: 'role',
    icon: '🎭',
    title: 'Give Claude a Role',
    color: '#884933',
    bad: {
      label: '❌ No Role Given',
      text: 'Review my email and make it better.',
      note: "\"Better\" means different things to different people. Claude will guess — and probably guess wrong."
    },
    good: {
      label: '✅ Role Assigned',
      text: "Act as a senior copywriter who specializes in men's lifestyle brands. Review the email below and suggest edits that make it punchier and more direct. Flag anything that sounds too corporate.\n\n[paste your email here]",
      note: "Giving Claude a role tells it what lens to use. It'll write like someone who actually knows what makes good copy."
    }
  },
  {
    id: 'example',
    icon: '💡',
    title: "Show It What You Like",
    color: '#4e5a31',
    bad: {
      label: '❌ No Reference Point',
      text: 'Write a tagline for our Cedar Body Wash. Make it sound cool.',
      note: '"Cool" is subjective. Claude has no idea what your taste looks like — you\'ll get something that feels off.'
    },
    good: {
      label: '✅ Example Provided',
      text: "Write a tagline for our Cedar Body Wash. Here's the vibe I want:\n\n- 'Born ready.'\n- 'Nature's grip.'\n- 'Built for the day ahead.'\n\nShort. Punchy. Masculine. Give me 5 options in the same style.",
      note: "A few examples are worth a thousand adjectives. Claude will match your style far more accurately when it can see what you mean."
    }
  },
  {
    id: 'refine',
    icon: '🔄',
    title: "Refine, Don't Restart",
    color: '#79dbd4',
    bad: {
      label: "❌ Giving Up After One Try",
      text: '[Claude writes a product description]\nYou: "Hmm, that\'s not quite right."\n[You close the chat and start over]',
      note: "Starting fresh throws away Claude's understanding of your task. You'll just get a different version of the same problem."
    },
    good: {
      label: '✅ Specific Follow-Up',
      text: "[Claude writes a product description]\nYou: \"Good start. Make it shorter — 30 words max. The tone is too formal; our brand is more casual and direct. Also, lead with the scent, not the brand name.\"",
      note: "Claude gets better with feedback in the same conversation. Tell it *specifically* what to change — it will apply every note at once."
    }
  }
];

export default function TipsLesson({ onNext, onBack }) {
  const [activeTab, setActiveTab] = useState(TIPS.map(() => 'bad'));

  const setTab = (i, tab) => {
    setActiveTab(prev => { const next = [...prev]; next[i] = tab; return next; });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f2e8da' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 48px' }}>

        <div style={{ marginBottom: 28 }}>
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#f2e8da', backgroundColor: '#884933',
            padding: '3px 10px', borderRadius: 2, marginBottom: 12,
            fontFamily: "'Barlow Condensed', sans-serif",
          }}>
            Lesson 3 of 4
          </span>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: '#253746', fontSize: 28, fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.5px', marginBottom: 8,
          }}>
            How to Write a Good Prompt 💡
          </h2>
          <p style={{ color: 'rgba(37,55,70,0.7)', fontSize: 14.5, lineHeight: 1.65 }}>
            The quality of Claude's answer depends almost entirely on how you ask. Compare the "meh" approach with the one that actually works — tap each card to flip between them.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {TIPS.map((tip, i) => (
            <div key={tip.id} style={{ background: 'white', borderRadius: 6, border: '1px solid rgba(37,55,70,0.09)' }}>
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, backgroundColor: tip.color, borderRadius: '6px 6px 0 0' }}>
                <span style={{ fontSize: 20 }}>{tip.icon}</span>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, color: '#253746' }}>{tip.title}</span>
              </div>

              <div style={{ display: 'flex', borderBottom: '1px solid rgba(37,55,70,0.07)' }}>
                {['bad', 'good'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setTab(i, tab)}
                    style={{
                      flex: 1, padding: '9px 12px', fontSize: 12.5, fontWeight: 700,
                      cursor: 'pointer', border: 'none', transition: 'all 0.15s',
                      fontFamily: "'Barlow', sans-serif",
                      backgroundColor: activeTab[i] === tab ? (tab === 'good' ? '#253746' : '#884933') : 'transparent',
                      color: activeTab[i] === tab ? '#f2e8da' : 'rgba(37,55,70,0.45)',
                    }}
                  >
                    {tab === 'bad' ? tip.bad.label : tip.good.label}
                  </button>
                ))}
              </div>

              <div style={{ padding: '14px 16px' }}>
                <div style={{
                  borderRadius: 4, padding: '12px 14px', marginBottom: 10,
                  fontSize: 13, fontFamily: "'JetBrains Mono', monospace",
                  whiteSpace: 'pre-wrap', lineHeight: 1.65,
                  backgroundColor: '#f2e8da', color: '#253746',
                  border: `1.5px solid ${activeTab[i] === 'good' ? '#79dbd4' : '#884933'}`,
                }}>
                  {activeTab[i] === 'bad' ? tip.bad.text : tip.good.text}
                </div>
                <p style={{
                  fontSize: 12.5, fontWeight: 600, lineHeight: 1.55,
                  color: activeTab[i] === 'good' ? '#4e5a31' : '#884933',
                }}>
                  {activeTab[i] === 'bad' ? `⚠️ ${tip.bad.note}` : `✅ ${tip.good.note}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#253746', color: '#f2e8da', borderRadius: 6, padding: '16px 18px', marginBottom: 28 }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, color: '#ffc56e', marginBottom: 12 }}>⚡ Prompting Quick Reference</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { do: true,  text: 'Include who you are and who the output is for' },
              { do: false, text: 'Assume Claude already knows your brand or context' },
              { do: true,  text: 'Specify length, format, and tone upfront' },
              { do: false, text: 'Use vague words like "good", "cool", or "better"' },
              { do: true,  text: 'Give Claude a role ("Act as a copywriter...")' },
              { do: false, text: 'Start over when the first answer is close but not right' },
              { do: true,  text: 'Show an example of the style you want' },
              { do: false, text: 'Ask for everything at once with no structure' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0 }}>{item.do ? '✅' : '❌'}</span>
                <span style={{ fontSize: 13, opacity: 0.82, lineHeight: 1.5 }}>{item.text}</span>
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
            NEXT: CHOOSING A MODEL →
          </button>
        </div>
      </div>
    </div>
  );
}
