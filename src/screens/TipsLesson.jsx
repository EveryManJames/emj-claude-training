import { useState } from 'react';

const TIPS = [
  {
    id: 'specific',
    icon: '🎯',
    title: 'Be Specific Upfront',
    color: '#79dbd4',
    bad: {
      label: '❌ Vague Prompt',
      text: "Hey Claude, I hope you're doing well today! I was wondering, when you have a moment, if you could help me write something about one of our products? It's a shampoo and it's really good. Maybe you could write a description or something like that? Thanks so much!",
      note: '~50 tokens just to ask. Claude still has to guess format, length, tone, and product.'
    },
    good: {
      label: '✅ Specific Prompt',
      text: 'Write a 60-word product description for EMJ 2-in-1 Shampoo + Conditioner. Tone: clean, masculine, outdoorsy. Highlight: natural ingredients, fresh scent.',
      note: '~30 tokens. Claude knows exactly what to do — less back-and-forth needed.'
    }
  },
  {
    id: 'format',
    icon: '📐',
    title: 'Specify the Format',
    color: '#ffc56e',
    bad: {
      label: '❌ No Format Guidance',
      text: 'Tell me about our top-selling products.',
      note: "Claude might write 800 words when you only needed 3 bullet points."
    },
    good: {
      label: '✅ Format Specified',
      text: 'List our top 3 best-selling product categories in 3 bullet points, one sentence each. No intro or conclusion.',
      note: 'Short, tight output = fewer tokens used, faster answer, easier to read.'
    }
  },
  {
    id: 'reuse',
    icon: '♻️',
    title: 'Reuse Prompts, Don\'t Repeat Context',
    color: '#884933',
    bad: {
      label: '❌ Repeating context every time',
      text: "I work at Every Man Jack, a men's grooming brand. We sell body wash, shampoo, deodorant, and skincare. Our audience is men 25-45 who care about natural ingredients. Now write a subject line for our spring email campaign.",
      note: "You're paying tokens to re-explain EMJ every single time."
    },
    good: {
      label: '✅ Use Claude\'s Memory or a Saved Prompt',
      text: "[Save your company context once in a Project] Write a subject line for our spring email campaign. Focus on the new Cedar + Citrus scent. Playful tone.",
      note: 'Save your EMJ context once in a Claude Project — Claude remembers it so you don\'t have to repeat it.'
    }
  },
  {
    id: 'tasks',
    icon: '🔗',
    title: 'Combine Related Tasks',
    color: '#4e5a31',
    bad: {
      label: '❌ Three Separate Conversations',
      text: 'Conversation 1: "Write a subject line for our deodorant launch email."\nConversation 2: "Now write the email body."\nConversation 3: "Now write a follow-up email."',
      note: 'Three separate chats = three separate context windows filled up with background info.'
    },
    good: {
      label: '✅ One Focused Conversation',
      text: 'Write a 3-part email sequence for launching our new aluminum-free deodorant:\n1. Subject line options (5)\n2. Launch email body (150 words)\n3. Follow-up email (100 words, urgency-focused)',
      note: 'One conversation handles the full task — context is shared efficiently.'
    }
  },
  {
    id: 'files',
    icon: '📁',
    title: 'Be Selective About What Claude Reads',
    color: '#884933',
    bad: {
      label: '❌ Sending Claude on a File Hunt',
      text: 'Search my Google Drive for everything related to the 2023 fall campaign and give me a summary.',
      note: 'Claude may read dozens of documents — tens of thousands of tokens — before writing a single word. A full Drive scan of 20 docs ≈ 70,000 tokens.'
    },
    good: {
      label: '✅ You Find It, Claude Thinks About It',
      text: 'I pulled up the Q3 2023 Fall Campaign Brief from Drive. Here\'s the relevant section:\n\n"[paste the 2–3 paragraphs that actually matter]"\n\nSummarize the main campaign goals in 3 bullet points.',
      note: 'You do the finding, Claude does the thinking. Pasting a relevant excerpt instead of triggering a file search can save 50× or more tokens.'
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
            5 Tips to Use Claude Smarter 💡
          </h2>
          <p style={{ color: 'rgba(37,55,70,0.7)', fontSize: 14.5, lineHeight: 1.65 }}>
            Compare the "meh" approach vs. the smart approach. Tap each card to flip between them.
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
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, color: '#ffc56e', marginBottom: 12 }}>⚡ Quick Cheat Sheet</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { do: true, text: 'Be specific about length, tone & format' },
              { do: false, text: 'Write "Hey Claude, hope you\'re well..."' },
              { do: true, text: 'Start fresh chats for new topics' },
              { do: false, text: 'Paste entire email threads unnecessarily' },
              { do: true, text: 'Save context once in a Claude Project' },
              { do: false, text: 'Re-explain EMJ in every single message' },
              { do: true, text: 'Batch related tasks in one conversation' },
              { do: false, text: 'Upload files you don\'t actually need' },
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
