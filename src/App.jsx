import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Instructions from './pages/instructions'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
