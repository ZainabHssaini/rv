import { useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // Modifié ici

interface Message {
  id: number
  text: string
  sender: 'user' | 'therapist'
  timestamp: string
}

const ChatTherapist = () => {
  const navigate = useNavigate() // Ajouté ici
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! How can I help you today?',
      sender: 'therapist',
      timestamp: '10:00 AM'
    }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)} // Modifié ici
          className="text-reviva-teal hover:text-reviva-deep-teal transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-reviva-purple">Chat with Therapist</h1>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-lg p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-reviva-teal text-white'
                    : 'bg-reviva-beige/20 text-reviva-charcoal'
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-reviva-teal"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-reviva-teal text-white rounded-lg hover:bg-reviva-deep-teal transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatTherapist