import React, { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  isError?: boolean;
}

type Language = 'tr' | 'en' | 'de' | 'other';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>('tr');
  const [questionsLeft, setQuestionsLeft] = useState(3);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const welcomeMsgs = {
      tr: "Merhaba! Ben İrfan'ın Dijital Asistanıyım. Kariyeri ve projeleri hakkında her şeyi sorabilirsiniz.",
      en: "Hello! I am Irfan's Digital Assistant. You can ask me anything about his career and projects.",
      de: "Hallo! Ich bin Irfans digitaler Assistent. Sie können mich alles über seine Karriere und Projekte fragen.",
      other: "Hello! Please ask your question in any language you prefer."
    };
    setMessages([{ text: welcomeMsgs[lang], sender: 'bot' }]);
  }, [lang]);

  const handleSend = async () => {
    if (!input.trim() || questionsLeft <= 0) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setIsTyping(true);
    setQuestionsLeft(prev => prev - 1);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language: lang }),
      });

      const data = await response.json();
      
      if (response.status === 429) {
        setMessages(prev => [...prev, { text: data.error, sender: 'bot', isError: true }]);
        setQuestionsLeft(0);
      } else {
        setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: "Bağlantı hatası oluştu.", sender: 'bot', isError: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const getTypingText = () => {
    if (lang === 'tr') return "Asistan düşünüyor...";
    if (lang === 'de') return "Assistent denkt nach...";
    return "Assistant is thinking...";
  };

  return (
    <div className="chat-widget-container">
      {/* Chat Window with Slide-in Animation via CSS class */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="bot-info">
            <span className="bot-avatar">🤖</span>
            <div className="bot-text-info">
              <span className="bot-name">İrfan'ın Asistanı</span>
              <div className="lang-selector">
                <span className={lang === 'tr' ? 'active' : ''} onClick={() => setLang('tr')}>🇹🇷</span>
                <span className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>🇬🇧</span>
                <span className={lang === 'de' ? 'active' : ''} onClick={() => setLang('de')}>🇩🇪</span>
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-bubble ${msg.sender}-bubble ${msg.isError ? 'error-bubble' : ''}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && <div className="typing-indicator">{getTypingText()}</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-footer">
          <div className="input-area">
            <input 
              type="text" 
              placeholder={questionsLeft > 0 ? (lang === 'tr' ? "Yazın..." : "Type...") : (lang === 'tr' ? "Limit doldu" : "Limit reached")} 
              value={input}
              disabled={questionsLeft <= 0}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend} disabled={questionsLeft <= 0}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
          <div className="usage-stats">
            <span className={`count-badge ${questionsLeft === 0 ? 'zero' : ''}`}>
              {lang === 'tr' ? 'Kalan Hak:' : 'Remaining:'} {questionsLeft}
            </span>
          </div>
        </div>
      </div>

      {/* Toggle Button with Initials and Pulse Effect */}
      <button className={`chat-toggle pulsing ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <span className="toggle-icon">×</span>
        ) : (
          <span className="toggle-initials">İD</span>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
