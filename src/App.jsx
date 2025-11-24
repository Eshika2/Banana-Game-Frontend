import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Instructions from './pages/instructions'
import Game from './pages/Game'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/game" element={<Game />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
