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
  }
];

export default function TipsLesson({ onNext, onBack }) {
  const [activeTab, setActiveTab] = useState(TIPS.map(() => 'bad'));

  const setTab = (i, tab) => {
    setActiveTab(prev => { const next = [...prev]; next[i] = tab; return next; });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f2e8da' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">

        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: '#884933', color: '#f2e8da' }}>
            Lesson 3 of 4
          </span>
          <h2 className="text-3xl font-black mb-2" style={{ color: '#253746' }}>
            4 Tips to Use Claude Smarter 💡
          </h2>
          <p style={{ color: '#253746', opacity: 0.75 }}>
            Compare the "meh" approach vs. the smart approach. Tap each card to flip between them.
          </p>
        </div>

        <div className="space-y-5 mb-8">
          {TIPS.map((tip, i) => (
            <div key={tip.id} className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: 'white' }}>
              {/* Card header */}
              <div className="px-5 py-4 flex items-center gap-3" style={{ backgroundColor: tip.color }}>
                <span className="text-2xl">{tip.icon}</span>
                <span className="font-black text-lg" style={{ color: '#253746' }}>{tip.title}</span>
              </div>

              {/* Toggle */}
              <div className="flex border-b" style={{ borderColor: '#e8ddd0' }}>
                {['bad', 'good'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setTab(i, tab)}
                    className="flex-1 py-2 text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: activeTab[i] === tab ? (tab === 'good' ? '#253746' : '#884933') : 'transparent',
                      color: activeTab[i] === tab ? '#f2e8da' : '#253746',
                      opacity: activeTab[i] === tab ? 1 : 0.5,
                    }}
                  >
                    {tab === 'bad' ? tip.bad.label : tip.good.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-5">
                <div
                  className="rounded-xl p-4 mb-3 text-sm font-mono whitespace-pre-wrap leading-relaxed"
                  style={{
                    backgroundColor: '#f2e8da',
                    color: '#253746',
                    border: `1.5px solid ${activeTab[i] === 'good' ? '#79dbd4' : '#884933'}`,
                  }}
                >
                  {activeTab[i] === 'bad' ? tip.bad.text : tip.good.text}
                </div>
                <p className="text-sm" style={{ color: activeTab[i] === 'good' ? '#4e5a31' : '#884933', fontWeight: 600 }}>
                  {activeTab[i] === 'bad' ? `⚠️ ${tip.bad.note}` : `✅ ${tip.good.note}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cheat sheet */}
        <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: '#253746', color: '#f2e8da' }}>
          <p className="font-black mb-3" style={{ color: '#ffc56e' }}>⚡ Quick Cheat Sheet</p>
          <div className="grid grid-cols-2 gap-3">
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
              <div key={i} className="flex gap-2 items-start text-sm">
                <span>{item.do ? '✅' : '❌'}</span>
                <span style={{ opacity: 0.85 }}>{item.text}</span>
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
            Next: Quick Quiz →
          </button>
        </div>
      </div>
    </div>
  );
}
