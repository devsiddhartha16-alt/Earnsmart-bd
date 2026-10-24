
import { useState } from 'react';
import { Bot, Send, X, MessageCircle, Sparkles } from 'lucide-react';

const suggestions = [
  'AI দিয়ে কীভাবে শিখব?',
  'ওয়েবসাইট বানানো শুরু করব কীভাবে?',
  'ফ্রিল্যান্সিং কী?'
];

function getDemoReply(message) {
  const text = message.toLowerCase();

  if (text.includes('website') || text.includes('ওয়েবসাইট')) {
    return 'ওয়েবসাইট শেখার জন্য প্রথমে HTML, তারপর CSS এবং JavaScript শিখো। ছোট একটি প্রজেক্ট দিয়ে অনুশীলন শুরু করতে পারো।';
  }

  if (text.includes('freelanc') || text.includes('ফ্রিল্যান্স')) {
    return 'ফ্রিল্যান্সিং শুরু করার আগে একটি দক্ষতা বেছে নাও, অনুশীলন করো এবং নিজের কাজের নমুনা দিয়ে একটি পোর্টফোলিও তৈরি করো। আয় নিশ্চিত নয়; সময় ও অভিজ্ঞতা লাগে।';
  }

  if (text.includes('ai') || text.includes('এআই')) {
    return 'AI শেখার জন্য প্রথমে AI কীভাবে কাজে লাগে তা বোঝো। তারপর ভালো প্রশ্ন লেখা (prompting), AI দিয়ে গবেষণা এবং ফলাফল যাচাই করার অনুশীলন করো।';
  }

  return 'তোমার প্রশ্নের জন্য ধন্যবাদ! আমি এখন Demo Mode-এ আছি। নির্দিষ্ট AI সার্ভার যুক্ত করা হলে আমি আরও প্রাসঙ্গিক উত্তর দিতে পারব। আপাতত প্রশ্নটি আরও বিস্তারিতভাবে লিখে চেষ্টা করো।';
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'আসসালামু আলাইকুম! 👋 আমি EarnSmart Assistant। কী শিখতে চাও?'
    }
  ]);

  function sendMessage(event) {
    event.preventDefault();

    const question = message.trim();
    if (!question) return;

    setMessages(previous => [
      ...previous,
      { role: 'user', text: question },
      { role: 'assistant', text: getDemoReply(question) }
    ]);

    setMessage('');
  }

  return (
    <>
      {open && (
        <section className="ai-chat-panel" aria-label="AI Assistant">
          <header className="ai-chat-header">
            <span className="ai-avatar"><Bot size={22} /></span>
            <div className="ai-chat-heading">
              <strong>EarnSmart Assistant</strong>
              <span><i /> Demo Mode</span>
            </div>
            <button
              className="ai-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </header>

          <div className="ai-chat-messages" aria-live="polite">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`ai-message ${item.role === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {item.text}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="ai-suggestions">
                <span>দ্রুত প্রশ্ন করো</span>
                {suggestions.map(question => (
                  <button
                    key={question}
                    onClick={() => setMessage(question)}
                  >
                    <Sparkles size={13} />
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="ai-chat-form" onSubmit={sendMessage}>
            <input
              value={message}
              onChange={event => setMessage(event.target.value)}
              placeholder="তোমার প্রশ্ন লেখো..."
              aria-label="Write your question"
              maxLength={1000}
            />
            <button type="submit" aria-label="Send message">
              <Send size={18} />
            </button>
          </form>

          <p className="ai-demo-note">
            এটি Demo Assistant; উত্তরগুলো বাস্তব AI থেকে আসছে না।
          </p>
        </section>
      )}

      <button
        className={`ai-floating-button ${open ? 'ai-floating-open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close assistant' : 'Open AI assistant'}
      >
        {open ? <X size={23} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
