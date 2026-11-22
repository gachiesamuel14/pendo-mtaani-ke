import { Link } from 'react-router-dom'
import { mockUsers } from '../data/mockUsers'
import { MessageCircle } from 'lucide-react'

export default function Matches() {
  const matches = mockUsers.slice(0, 3)

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Matches</h1>
      <div className="space-y-4">
        {matches.map(m => (
          <Link
            key={m.id}
            to={`/chat/${m.id}`}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-md transition"
          >
            <img src={m.photos[0]} alt={m.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold">{m.name}, {m.age}</h3>
              <p className="text-sm text-gray-500">{m.town}, {m.county}</p>
            </div>
            <MessageCircle className="w-6 h-6 text-primary" />
          </Link>
        ))}
      </div>
      {matches.length === 0 && <p className="text-center text-gray-500">No matches yet. Keep swiping!</p>}
    </div>
  )
}
