import { Link, useNavigate } from 'react-router-dom'
import { Heart, MapPin, MessageCircle, User } from 'lucide-react'
import { AuthContext } from '../App'
import { useContext } from 'react'

export default function Navbar() {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-rose-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/discover" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Heart className="w-8 h-8 fill-primary" />
          Pendo Mtaani
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/discover" className="flex items-center gap-1 text-gray-700 hover:text-primary">
            <MapPin className="w-5 h-5" /> Discover
          </Link>
          <Link to="/matches" className="flex items-center gap-1 text-gray-700 hover:text-primary">
            <MessageCircle className="w-5 h-5" /> Matches
          </Link>
          <Link to="/profile" className="flex items-center gap-1 text-gray-700 hover:text-primary">
            <User className="w-5 h-5" /> Profile
          </Link>
          <button
            onClick={() => { setUser(null); navigate('/') }}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
