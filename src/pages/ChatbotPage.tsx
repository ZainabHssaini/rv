import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChatbotPage = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<{ isUser: boolean; text: string; }[]>([
    { isUser: false, text: "Hi there! I'm Reviva's AI mental health assistant. How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const generateResponse = (userMessage: string) => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('anxious') || lowercaseMessage.includes('anxiety') || lowercaseMessage.includes('worried')) {
      return "I can see you're feeling anxious. Anxiety is a common experience, and there are several strategies that might help. Deep breathing exercises can be effective in the moment. Would you like me to guide you through a quick breathing exercise?";
    }
    
    if (lowercaseMessage.includes('sad') || lowercaseMessage.includes('depressed') || lowercaseMessage.includes('down')) {
      return "I'm sorry to hear you're feeling down. Depression and sadness are difficult emotions to navigate. Remember that it's okay to feel this way, and reaching out for support is a positive step. Would you like to explore some mood-lifting activities or resources for professional support?";
    }
    
    if (lowercaseMessage.includes('stressed') || lowercaseMessage.includes('overwhelmed') || lowercaseMessage.includes('pressure')) {
      return "It sounds like you're under a lot of pressure right now. Stress can be overwhelming, but there are ways to manage it. Have you tried any stress-reduction techniques lately? Sometimes even small breaks for self-care can make a difference.";
    }
    
    if (lowercaseMessage.includes('sleep') || lowercaseMessage.includes('insomnia') || lowercaseMessage.includes('tired')) {
      return "Sleep difficulties can really affect our mental wellbeing. Establishing a consistent sleep routine and creating a calming bedtime environment can help. Would you like some specific tips for improving your sleep quality?";
    }
    
    if (lowercaseMessage.includes('angry') || lowercaseMessage.includes('frustrated') || lowercaseMessage.includes('mad')) {
      return "I understand you're feeling frustrated. Anger is a natural emotion, though it can be uncomfortable. Taking a moment to pause before reacting can sometimes help. Would you like to discuss some healthy ways to express and process these feelings?";
    }
    
    if (lowercaseMessage.includes('help') || lowercaseMessage.includes('resources') || lowercaseMessage.includes('support')) {
      return "I'm glad you're looking for support. There are many resources available depending on what you need. These range from self-help techniques to professional services. Could you tell me more about what kind of help you're looking for?";
    }
    
    if (lowercaseMessage.includes('thank') || lowercaseMessage.includes('thanks')) {
      return "You're very welcome. I'm here to support you whenever you need it. Is there anything else I can help with today?";
    }
    
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
      return "Hello! It's nice to connect with you. How are you feeling today, and how can I support your mental wellbeing?";
    }
    
    if (lowercaseMessage.includes('bye') || lowercaseMessage.includes('goodbye')) {
      return "Take care! Remember that I'm here anytime you need support. Wishing you well until our next conversation.";
    }
    
    if (lowercaseMessage.includes('feel good') || lowercaseMessage.includes('happy') || lowercaseMessage.includes('great')) {
      return "I'm happy to hear you're feeling good! It's important to acknowledge and celebrate positive emotions too. What's contributing to your positive mood today?";
    }
    
    if (userMessage.endsWith('?')) {
      return "That's a thoughtful question. I'd like to understand more about your situation to provide a helpful response. Could you share a bit more about what prompted this question?";
    }
    
    return "Thank you for sharing that with me. Your mental wellbeing is important. Can you tell me more about what you're experiencing, so I can better support you?";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { isUser: true, text: input }]);
    setInput("");
    
    setIsThinking(true);
    
    setTimeout(() => {
      const aiResponse = generateResponse(input);
      setMessages(prev => [...prev, { isUser: false, text: aiResponse }]);
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
            <div className="h-[400px] overflow-y-auto p-4 bg-white/40 dark:bg-reviva-charcoal/40" id="chat-container">
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