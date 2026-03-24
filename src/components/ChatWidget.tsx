import { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';

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
      setMessages(prev => [...prev, { text: "Bağlantı hatası.", sender: 'bot', isError: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-widget-container">
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="bot-info">
            <span className="bot-avatar">🤖</span>
            <div className="bot-text-info">
              <span className="bot-name">Asistan</span>
              <div className="lang-selector">
                <span className={lang === 'tr' ? 'active' : ''} onClick={() => setLang('tr')}>TR</span>
                <span className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</span>
                <span className={lang === 'de' ? 'active' : ''} onClick={() => setLang('de')}>DE</span>
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
              placeholder={questionsLeft > 0 ? "..." : "Limit"} 
              value={input}
              disabled={questionsLeft <= 0}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend} disabled={questionsLeft <= 0}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </div>
          <div className="usage-stats">
            <span className={`count-badge ${questionsLeft === 0 ? 'zero' : ''}`}>{questionsLeft}/3</span>
          </div>
        </div>
      </div>

      <button className={`chat-toggle pulsing ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <span className="toggle-icon">×</span>
        ) : (
          <div style={{ width: 80, height: 80, marginTop: -5 }}>
            <Lottie 
              animationData={{
                "v": "5.5.7", "fr": 30, "ip": 0, "op": 60, "w": 100, "h": 100, "nm": "Robot", "ddd": 0,
                "assets": [], "layers": [{"ddd": 0, "ind": 1, "ty": 4, "nm": "Circle", "sr": 1, "ks": {"o": {"a": 0, "k": 100}, "r": {"a": 0, "k": 0}, "p": {"a": 0, "k": [50, 50]}, "a": {"a": 0, "k": [0, 0]}, "s": {"a": 1, "k": [{"i": {"x": [0.667, 0.667], "y": [1, 1]}, "o": {"x": [0.333, 0.333], "y": [0, 0]}, "t": 0, "s": [80, 80]}, {"t": 30, "s": [100, 100]}, {"t": 60, "s": [80, 80]}]}}, "shapes": [{"ty": "gr", "it": [{"d": 1, "ty": "el", "s": {"a": 0, "k": [50, 50]}, "p": {"a": 0, "k": [0, 0]}, "nm": "Ellipse"}, {"ty": "fl", "c": {"a": 0, "k": [1, 1, 1, 1]}, "o": {"a": 0, "k": 100}, "nm": "Fill"}, {"ty": "tr", "p": {"a": 0, "k": [0, 0]}, "a": {"a": 0, "k": [0, 0]}, "s": {"a": 0, "k": [100, 100]}, "r": {"a": 0, "k": 0}, "o": {"a": 0, "k": 100}, "nm": "Transform"}]}]}]
              }}
              loop={true}
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
