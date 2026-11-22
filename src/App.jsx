import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Discover from './pages/Discover'
import Matches from './pages/Matches'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import Navbar from './components/Navbar'
import { useState, createContext, useContext } from 'react'

export const AuthContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  const [location, setLocation] = useState({ lat: -1.286389, lng: 36.817223, county: 'Nairobi' }) // Nairobi default

  return (
    <AuthContext.Provider value={{ user, setUser, location, setLocation }}>
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/discover" /> : <Landing />} />
          <Route path="/discover" element={user ? <Discover /> : <Navigate to="/" />} />
          <Route path="/matches" element={user ? <Matches /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
          <Route path="/chat/:id" element={user ? <Chat /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
