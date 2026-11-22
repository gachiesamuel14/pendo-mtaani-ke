import { useParams } from 'react-router-dom'
import { mockUsers } from '../data/mockUsers'
import { useState } from 'react'
import { Send } from 'lucide-react'

export default function Chat() {
  const { id } = useParams()
  const match = mockUsers.find(u => u.id === +id) || mockUsers[0]
  const [messages, setMessages] = useState([
    { from: 'them', text: `Habari! I saw we matched. How's your day going?` },
  ])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { from: 'me', text: input }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'them', text: 'Nice! Want to grab coffee sometime?' }])
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-white">
      <div className="p-4 border-b flex items-center gap-3">
        <img src={match.photos[0]} alt="" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <h2 className="font-semibold">{match.name}</h2>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${m.from === 'me' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 border rounded-full outline-none focus:ring-2 focus:ring-primary"
        />
        <button onClick={send} className="bg-primary text-white p-3 rounded-full">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
