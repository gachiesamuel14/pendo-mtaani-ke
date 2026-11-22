import { useContext } from 'react'
import { AuthContext } from '../App'
import { MapPin, Shield } from 'lucide-react'

export default function Profile() {
  const { user, location } = useContext(AuthContext)

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-rose-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
          {user?.name?.[0] || 'U'}
        </div>
        <h2 className="text-2xl font-bold">{user?.name || 'Your Name'}</h2>
        <p className="text-gray-500">{user?.age} years • {user?.county || location.county}</p>
        <p className="mt-4 text-gray-700">{user?.bio || 'Add a bio to attract better matches.'}</p>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          Location sharing enabled
        </div>

        <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-center gap-2 justify-center text-amber-700 font-medium">
            <Shield className="w-5 h-5" />
            Safety First
          </div>
          <p className="text-xs text-amber-600 mt-1">
            Never share personal details too soon. Report suspicious users. Meet in public places.
          </p>
        </div>

        <button className="mt-6 w-full border-2 border-primary text-primary py-3 rounded-xl font-semibold">
          Edit Profile (coming soon)
        </button>
      </div>
    </div>
  )
}
