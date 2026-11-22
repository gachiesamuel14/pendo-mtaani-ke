import { useState, useContext } from 'react'
import { AuthContext } from '../App'
import { Heart, MapPin } from 'lucide-react'

export default function Landing() {
  const { setUser, setLocation } = useContext(AuthContext)
  const [step, setStep] = useState('welcome')
  const [form, setForm] = useState({ name: '', age: '', county: 'Nairobi', bio: '' })

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            county: form.county || 'Nairobi'
          })
        },
        () => {
          setLocation({ lat: -1.286389, lng: 36.817223, county: form.county || 'Nairobi' })
        }
      )
    }
  }

  const startApp = () => {
    handleGetLocation()
    setUser({ ...form, id: Date.now() })
  }

  if (step === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-8">
          <Heart className="w-20 h-20 text-primary mx-auto mb-4 fill-primary animate-pulse" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Pendo Mtaani</h1>
          <p className="text-xl text-gray-600 max-w-md">
            Find love nearby. Connect with Kenyans in your county — Nairobi, Mombasa, Kisumu, Kiambu & more.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setStep('register')}
            className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-rose-600 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => { setUser({ name: 'Demo User', age: 25, county: 'Nairobi' }); }}
            className="border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transition"
          >
            Try Demo
          </button>
        </div>
        <div className="mt-12 flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          Location-based matching across Kenya
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Profile</h2>
        <div className="space-y-4">
          <input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
          />
          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
          />
          <select
            value={form.county}
            onChange={(e) => setForm({ ...form, county: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
          >
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
            <option>Kiambu</option>
            <option>Nakuru</option>
            <option>Eldoret</option>
          </select>
          <textarea
            placeholder="Short bio..."
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none h-24"
          />
          <button
            onClick={startApp}
            disabled={!form.name || !form.age}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold disabled:opacity-50 hover:bg-rose-600 transition"
          >
            Start Matching
          </button>
        </div>
        <p className="text-xs text-center text-gray-500 mt-4">
          We'll ask for location permission to find people nearby. M-Pesa for premium features coming soon.
        </p>
      </div>
    </div>
  )
}
