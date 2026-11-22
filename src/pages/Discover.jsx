import { useState, useContext } from 'react'
import { AuthContext } from '../App'
import { mockUsers } from '../data/mockUsers'
import { Heart, X, MapPin, Filter } from 'lucide-react'

export default function Discover() {
  const { location } = useContext(AuthContext)
  const [users, setUsers] = useState(mockUsers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({ county: 'All', maxDistance: 500, minAge: 18, maxAge: 50 })

  const filtered = users.filter(u => {
    if (filters.county !== 'All' && u.county !== filters.county) return false
    if (u.distance > filters.maxDistance) return false
    if (u.age < filters.minAge || u.age > filters.maxAge) return false
    return true
  })

  const current = filtered[currentIndex]

  const swipe = (liked) => {
    if (!current) return
    console.log(liked ? 'Liked' : 'Passed', current.name)
    setCurrentIndex(i => i + 1)
  }

  if (!current) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No more people nearby</h2>
        <p className="text-gray-600">Check back later or adjust your filters.</p>
        <button onClick={() => setCurrentIndex(0)} className="mt-6 text-primary underline">Reset</button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Discover Nearby</h1>
        <button onClick={() => setShowFilters(!showFilters)} className="p-2 rounded-full hover:bg-gray-100">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {showFilters && (
        <div className="px-4 pb-4 space-y-3 bg-gray-50 rounded-b-xl">
          <select
            value={filters.county}
            onChange={(e) => setFilters({ ...filters, county: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option>All</option>
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
            <option>Kiambu</option>
          </select>
          <div>
            <label className="text-sm">Max distance: {filters.maxDistance} km</label>
            <input type="range" min="5" max="500" value={filters.maxDistance} onChange={(e) => setFilters({ ...filters, maxDistance: +e.target.value })} className="w-full" />
          </div>
        </div>
      )}

      <div className="relative mx-4 mt-2 rounded-3xl overflow-hidden shadow-2xl h-[70vh]">
        <img src={current.photos[0]} alt={current.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h2 className="text-3xl font-bold">{current.name}, {current.age}</h2>
          <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
            <MapPin className="w-4 h-4" />
            {current.town}, {current.county} • {current.distance} km away
          </div>
          <p className="mt-2 text-sm line-clamp-2">{current.bio}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {current.interests.map(i => (
              <span key={i} className="bg-white/20 px-2 py-1 rounded-full text-xs">{i}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8 py-6">
        <button
          onClick={() => swipe(false)}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:border-red-400 hover:scale-110 transition"
        >
          <X className="w-8 h-8 text-red-500" />
        </button>
        <button
          onClick={() => swipe(true)}
          className="w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
        >
          <Heart className="w-8 h-8 text-white fill-white" />
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 pb-8">
        Your location: {location.county} • Demo mode with sample profiles
      </p>
    </div>
  )
}
