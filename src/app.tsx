import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { setName, setPhotoURL, setStatus } from './features/user/user-slice'
import Dictionary from './screens/dictionary'
import Home from './screens/home'
import Profile from './screens/profile'
import Room from './screens/room'
import Word from './screens/word'
import Header from './components/header'
import './firebase'

const App: React.FC = () => {
  const dispatch = useDispatch()

  /**
   * This effect is run once when the app is first loaded.
   * It sets up a listener for auth state changes.
   */
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      console.log("Auth state changed. Updating user: ", authUser);
      dispatch(setName(authUser?.displayName ? authUser.displayName : ""))
      dispatch(setStatus(authUser ? true : false))
      dispatch(setPhotoURL(authUser?.photoURL ? authUser.photoURL : ""))
    });
    return () => unsubscribe();
  }, []);

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
