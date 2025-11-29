import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Instructions from './pages/Instructions'
import Game from './pages/Game'
import Rank from './pages/Rank'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />

          <Route path="/game" element={<Game />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/*" element={
            <h1 className="d-flex flex-column justify-content-center align-items-center vh-100 text-center text-danger">
              404 Page Not Found
            </h1>} 
          />
        </Routes>
    </BrowserRouter>
  )
}

export default App
