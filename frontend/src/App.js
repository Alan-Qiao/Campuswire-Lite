import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'

const App = () => (
  <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  </div>
)

export default App
