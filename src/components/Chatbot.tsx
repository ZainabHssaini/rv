import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { isUser: false, text: "Hello! I'm your mental health assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Your color palette
  const colors = {
    primary: '#1d858d',
    secondary: '#279692',
    dark1: '#10566e',
    dark2: '#1b6d80',
    accent: '#35a79b'
  };

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { isUser: true, text: input }]);
    setInput('');
    setIsThinking(true);
    
    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: input }] }],
      });
      const response = await result.response;
      const text = response.text();
      setMessages(prev => [...prev, { isUser: false, text }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        isUser: false, 
        text: "Sorry, I'm having trouble responding. Please try again later." 
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div 
          className="w-96 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200"
          style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
        >
          {/* Header with gradient */}
          <div 
            className="flex justify-between items-center p-4 rounded-t-xl"
            style={{ 
              background: `linear-gradient(to right, ${colors.dark1}, ${colors.primary})`,
              borderBottom: `1px solid ${colors.dark2}`
            }}
          >
            <h3 className="font-medium text-white">Mental Health Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-[#35a79b] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Messages container - now with white background */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-xl px-4 py-3 ${
                    msg.isUser 
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  style={{
                    background: msg.isUser 
                      ? `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`
                      : undefined,
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-800">
                  <div className="flex space-x-1.5 items-center"> {/* Reduced space between dots */}
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ 
                      background: colors.primary,
                      animationDelay: '0s' 
                    }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ 
                      background: colors.secondary,
                      animationDelay: '0.2s' 
                    }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ 
                      background: colors.accent,
                      animationDelay: '0.4s' 
                    }}></div>
                  </div>  
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Improved input area */}
          <div 
            className="p-4 bg-gray-50 border-t border-gray-200"
          >
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#35a79b] resize-none overflow-hidden"
                  style={{
                    minHeight: '60px',
                    maxHeight: '120px',
                    background: 'white',
                    boxShadow: 'none',
                    lineHeight: '1.5',
                  }}
                  disabled={isThinking}
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isThinking}
                className="p-3 rounded-xl text-white transition-colors disabled:opacity-50"
                style={{
                  background: `linear-gradient(to bottom right, ${colors.accent}, ${colors.secondary})`,
                  height: '60px'
                }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all"
          style={{
            background: `radial-gradient(circle, ${colors.accent}, ${colors.primary})`,
            boxShadow: `0 4px 15px ${colors.dark2}`
          }}
          aria-label="Open chat"
        >
          <MessageCircle size={28} className="text-white" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;

