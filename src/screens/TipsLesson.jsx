import { useState } from 'react';

const TIPS = [
  {
    id: 'specific',
    icon: '🎯',
    title: 'Be Specific Upfront',
    accent: '#79dbd4',
    bad: {
      label: '❌ Vague',
      text: "Hey Claude, I hope you're doing well! I was wondering if you could help me write something about one of our products? It's a shampoo and it's really good. Maybe a description or something? Thanks!",
      note: '~45 tokens just to ask — Claude still has to guess format, length, tone, and product.',
    },
    good: {
      label: '✅ Specific',
      text: 'Write a 60-word product description for EMJ 2-in-1 Shampoo + Conditioner. Tone: clean, masculine, outdoorsy. Highlight: natural ingredients, fresh scent.',
      note: '~30 tokens. Claude knows exactly what to do — less back-and-forth needed.',
    },
  },
  {
    id: 'format',
    icon: '📐',
    title: 'Specify the Format',
    accent: '#ffc56e',
    bad: {
      label: '❌ No Format',
      text: 'Tell me about our top-selling products.',
      note: 'Claude might write 800 words when you only needed 3 bullet points.',
    },
    good: {
      label: '✅ Format Specified',
      text: 'List our top 3 best-selling product categories in 3 bullet points, one sentence each. No intro or conclusion.',
      note: 'Short, tight output = fewer tokens, faster answer, easier to read.',
    },
  },
  {
    id: 'reuse',
    icon: '♻️',
    title: "Don't Repeat Context",
    accent: '#884933',
    lightHeader: true,
    bad: {
      label: '❌ Repeating Every Time',
      text: "I work at Every Man Jack, a men's grooming brand. We sell body wash, shampoo, deodorant, and skincare. Our audience is men 25–45 who care about natural ingredients. Now write a subject line for our spring email.",
      note: "You're paying tokens to re-explain EMJ every single message.",
    },
    good: {
      label: '✅ Use a Claude Project',
      text: "[Brand context saved in Project]\n\nWrite a subject line for our spring email campaign. Focus on the new Cedar + Citrus scent. Playful tone.",
      note: "Save your EMJ context once in a Claude Project — Claude remembers it so you don't have to repeat it.",
    },
  },
  {
    id: 'tasks',
    icon: '🔗',
    title: 'Batch Related Tasks',
    accent: '#4e5a31',
    lightHeader: true,
    bad: {
      label: '❌ Three Chats',
      text: 'Chat 1: "Write a subject line for our deodorant launch."\nChat 2: "Write the email body."\nChat 3: "Write a follow-up email."',
      note: 'Three chats = three context windows. You pay to re-establish background info each time.',
    },
    good: {
      label: '✅ One Focused Chat',
      text: 'Write a 3-part email sequence for launching our aluminum-free deodorant:\n1. 5 subject line options\n2. Launch email (150 words)\n3. Follow-up (100 words, urgency-focused)',
      note: 'One conversation handles the full task — context is shared and efficient.',
    },
  },
];

const BTN_BASE = {
  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
  fontSize: 15, letterSpacing: '0.04em', border: 'none', cursor: 'pointer',
  borderRadius: 4, transition: 'all 0.15s',
};

export default function TipsLesson({ onNext, onBack }) {
  const [activeTab, setActiveTab] = useState(TIPS.map(() => 'bad'));

  const setTab = (i, tab) => {
    setActiveTab(prev => { const next = [...prev]; next[i] = tab; return next; });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f2e8da' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Chapter header */}
        <div className="fade-up" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
          <div className="font-display" style={{
            fontSize: 90, fontWeight: 900, lineHeight: 0.8,
            color: 'rgba(37,55,70,0.09)', letterSpacing: '-5px',
            userSelect: 'none', flexShrink: 0, marginTop: -4,
          }}>03</div>
          <div style={{ flex: 1 }}>
            <span style={{
              display: 'inline-block', fontSize: 9.5, fontWeight: 800, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#f2e8da', backgroundColor: '#884933',
              padding: '3px 10px', borderRadius: 2, marginBottom: 8,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}>Lesson 3 of 4</span>
            <h2 className="font-display" style={{ color: '#253746', fontSize: 32, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.5px' }}>
              4 TIPS TO USE CLAUDE SMARTER
            </h2>
            <p style={{ color: '#253746', opacity: 0.62, marginTop: 6, fontSize: 14, lineHeight: 1.6 }}>
              Tap each card to flip between the "meh" approach and the smart approach.
            </p>
          </div>
        </div>

        {/* Tip cards */}
        <div className="fade-up delay-1" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {TIPS.map((tip, i) => (
            <div
              key={tip.id}
              className="card"
              style={{ border: '1px solid rgba(37,55,70,0.07)' }}
            >
              {/* Card header */}
              <div style={{ padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10, backgroundColor: tip.accent, borderRadius: '4px 4px 0 0' }}>
                <span style={{ fontSize: 18 }}>{tip.icon}</span>
                <span className="font-display" style={{ color: tip.lightHeader ? '#f2e8da' : '#253746', fontSize: 16, fontWeight: 900, letterSpacing: '0.02em' }}>{tip.title}</span>
              </div>

              {/* Tab toggle */}
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(37,55,70,0.08)' }}>
                {['bad', 'good'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setTab(i, tab)}
                    className="transition-all"
                    style={{
                      flex: 1, padding: '8px', fontSize: 12, fontWeight: 700,
                      fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.05em',
                      backgroundColor: activeTab[i] === tab
                        ? (tab === 'good' ? '#253746' : '#571a20')
                        : 'transparent',
                      color: activeTab[i] === tab ? '#f2e8da' : 'rgba(37,55,70,0.4)',
                      border: 'none', cursor: 'pointer',
                    }}
                  >
                    {tab === 'bad' ? tip.bad.label : tip.good.label}
                  </button>
                ))}
              </div>

              {/* Prompt display */}
              <div style={{ padding: '14px' }}>
                <div style={{
                  backgroundColor: '#f8f4ef',
                  borderRadius: 6,
                  padding: '10px 12px',
                  marginBottom: 10,
                  border: `1.5px solid ${activeTab[i] === 'good' ? '#79dbd4' : '#d4a9a0'}`,
                  fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
                  fontSize: 12.5, lineHeight: 1.65, color: '#253746',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word',
                  transition: 'border-color 0.2s',
                }}>
                  {activeTab[i] === 'bad' ? tip.bad.text : tip.good.text}
                </div>
                <p style={{
                  fontSize: 12.5, fontWeight: 600, lineHeight: 1.5,
                  color: activeTab[i] === 'good' ? '#4e5a31' : '#7a2e25',
                }}>
                  {activeTab[i] === 'bad' ? `⚠️ ${tip.bad.note}` : `✅ ${tip.good.note}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick reference */}
        <div className="fade-up delay-2" style={{ backgroundColor: '#253746', borderRadius: 8, padding: '16px', marginBottom: 28 }}>
          <p className="font-display" style={{ color: '#ffc56e', fontSize: 14, fontWeight: 900, letterSpacing: '0.04em', marginBottom: 12 }}>
            ⚡ QUICK REFERENCE
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
            {[
              { do: true,  text: 'Specify length, tone & format' },
              { do: false, text: 'Start with pleasantries' },
              { do: true,  text: 'Start fresh chats for new topics' },
              { do: false, text: 'Paste entire email threads' },
              { do: true,  text: 'Save EMJ context in a Project' },
              { do: false, text: 'Re-explain EMJ every message' },
              { do: true,  text: 'Batch related tasks together' },
              { do: false, text: "Upload files you don't need" },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12.5 }}>
                <span style={{ flexShrink: 0 }}>{item.do ? '✅' : '❌'}</span>
                <span style={{ color: 'rgba(242,232,218,0.8)', lineHeight: 1.45 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="fade-up delay-3" style={{ display: 'flex', gap: 10 }}>
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
            NEXT: CLAUDE MODELS →
          </button>
        </div>
      </div>
    </div>
  );
}
