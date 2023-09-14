import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { setName, setPhotoURL, setStatus } from './features/user/user-slice'
import { setRooms } from './features/room/room-slice'
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
  }, [])

  /**
   * This effect is run once when the app is first loaded.
   * It sets up a listener for room state changes.
   */
  useEffect(() => {
    const db = getFirestore();
    const roomsRef = collection(db, "rooms");
    const unsubscribe = onSnapshot(roomsRef, (snapshot) => {
      const rooms: string[] = snapshot.docs.map((doc) => doc.data().name) as string[];
      dispatch(setRooms(rooms))
    })
    return () => unsubscribe();
  }, [])

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
