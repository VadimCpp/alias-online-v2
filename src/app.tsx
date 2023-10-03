import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dictionary from './screens/dictionary'
import Home from './screens/home'
import Profile from './screens/profile'
import Room from './screens/room'
import About from './screens/about'
import Header from './components/header'
import useGameLogic from './game-logic'

const App: React.FC = () => {
  useGameLogic();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/room" element={<Room />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
