
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, User, Bot, Sparkles } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState<{ isUser: boolean; text: string; }[]>([
    { isUser: false, text: "Hi there! I'm Reviva's AI mental health assistant. How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { isUser: true, text: input }]);
    setInput("");
    
    // Simulate AI thinking
    setIsThinking(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. Would you like to explore some coping strategies?",
        "That sounds challenging. Remember that it's okay to ask for help when you need it.",
        "I appreciate you sharing that with me. What specific support are you looking for today?",
        "I'm here to listen. Would you like me to suggest some relaxation techniques?",
        "Your mental wellbeing matters. How can I best support you right now?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { isUser: false, text: randomResponse }]);
      setIsThinking(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center p-2 bg-reviva-mint/30 rounded-full mb-4">
              <Sparkles className="h-6 w-6 text-reviva-teal" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-2">
              AI Mental Health Assistant
            </h1>
            <p className="text-reviva-charcoal/80 dark:text-white/80 max-w-xl mx-auto">
              Chat with our compassionate AI assistant for immediate support, guidance, and mental health resources.
            </p>
          </div>
          
          <div className="glass-card dark:glass-card-dark rounded-2xl overflow-hidden shadow-lg mb-6 animate-scale-in">
            {/* Chat messages */}
            <div className="h-[400px] overflow-y-auto p-4 bg-white/40 dark:bg-reviva-charcoal/40">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`flex max-w-[80%] ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        msg.isUser 
                          ? 'bg-reviva-teal text-white ml-2' 
                          : 'bg-reviva-mint/50 text-reviva-deep-teal mr-2'
                      }`}>
                        {msg.isUser ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        msg.isUser 
                          ? 'bg-reviva-teal text-white rounded-tr-none' 
                          : 'bg-gray-100 dark:bg-reviva-purple/20 text-reviva-charcoal dark:text-white/90 rounded-tl-none'
                      }`}>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isThinking && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex flex-row">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-reviva-mint/50 text-reviva-deep-teal mr-2">
                        <Bot size={16} />
                      </div>
                      <div className="p-3 rounded-2xl bg-gray-100 dark:bg-reviva-purple/20 text-reviva-charcoal dark:text-white/90 rounded-tl-none">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-reviva-teal rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-reviva-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="h-2 w-2 bg-reviva-teal rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 py-2 px-4 rounded-full bg-gray-100 dark:bg-reviva-purple/10 focus:outline-none focus:ring-2 focus:ring-reviva-teal"
                  disabled={isThinking}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isThinking}
                  className={`ml-2 p-2 rounded-full ${
                    !input.trim() || isThinking
                      ? 'bg-gray-200 text-gray-400 dark:bg-gray-700'
                      : 'bg-reviva-teal text-white hover:bg-reviva-deep-teal'
                  } transition-colors`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            <div className="glass-card dark:glass-card-dark p-4 rounded-xl text-center">
              <h3 className="font-medium text-reviva-deep-teal mb-2">24/7 Support</h3>
              <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                Always here for you whenever you need guidance.
              </p>
            </div>
            <div className="glass-card dark:glass-card-dark p-4 rounded-xl text-center">
              <h3 className="font-medium text-reviva-deep-teal mb-2">Personalized</h3>
              <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                Tailored responses based on your unique situation.
              </p>
            </div>
            <div className="glass-card dark:glass-card-dark p-4 rounded-xl text-center">
              <h3 className="font-medium text-reviva-deep-teal mb-2">Resources</h3>
              <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                Access to mental health tools and techniques.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatbotPage;
