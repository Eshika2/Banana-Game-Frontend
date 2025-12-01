import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Instructions from './pages/Instructions'
import Game from './pages/Game'
import Rank from './pages/Rank'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ForgetPassword from './pages/ForgetPassword'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/home" element={<Home />} />

          <Route path="/game" element={<Game />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/*" element={
            <h1 className="text-3xl font-bold text-red-500 flex justify-center items-center h-screen">
              404 Page Not Found
            </h1>} 
          />
        </Routes>
    </BrowserRouter>
  )
}

export default App
