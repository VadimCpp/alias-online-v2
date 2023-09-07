import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dictionary from './screens/dictionary'
import Home from './screens/home'
import Profile from './screens/profile'
import Room from './screens/room'
import Word from './screens/word'
import Header from './components/header'

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/room" element={<Room />} />
        <Route path="/word" element={<Word />} />
      </Routes>
    </Router>
  )
}

export default App
