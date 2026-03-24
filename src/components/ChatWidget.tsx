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
  const [messages, setMessages] = useState<Message[]>([
    { text: "Merhaba! Ben İrfan'ın Dijital Asistanıyım. Kariyeri ve projeleri hakkında merak ettiğiniz her şeyi sorabilirsiniz.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Dil değiştiğinde botun ilk mesajını güncelle
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
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language: lang }),
      });

      const data = await response.json();
      
      if (response.status === 429) {
        setMessages(prev => [...prev, { text: data.error, sender: 'bot', isError: true }]);
      } else {
        setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: "Bağlantı hatası oluştu. Lütfen tekrar deneyin.", sender: 'bot', isError: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="bot-info">
              <span className="bot-avatar">🤖</span>
              <div className="bot-text-info">
                <span className="bot-name">Asistan</span>
                <div className="lang-selector">
                  <span className={lang === 'tr' ? 'active' : ''} onClick={() => setLang('tr')} title="Türkçe">🇹🇷</span>
                  <span className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')} title="English">🇬🇧</span>
                  <span className={lang === 'de' ? 'active' : ''} onClick={() => setLang('de')} title="Deutsch">🇩🇪</span>
                  <span className={lang === 'other' ? 'active' : ''} onClick={() => setLang('other')} title="Other">🌐</span>
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
            {isTyping && <div className="typing-indicator">...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <div className="input-area">
              <input 
                type="text" 
                placeholder={lang === 'tr' ? "Yazın..." : lang === 'de' ? "Schreiben..." : "Type..."} 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="send-btn" onClick={handleSend}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <p className="limit-disclaimer">Limit: 3/min</p>
          </div>
        </div>
      )}

      <button className={`chat-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
