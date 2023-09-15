import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, onSnapshot } from "firebase/firestore"

import { setName, setPhotoURL, setStatus } from './features/user/user-slice'
import { setRooms, setUsers } from './features/room/room-slice'
import type { RootState } from './store'


const googleProvider = new GoogleAuthProvider()
const firebaseConfig = {
  apiKey: "AIzaSyCIXUBQgGrUu6DPyzirXzCOsB_mjA9EIzM",
  authDomain: "alias-online-13de4.firebaseapp.com",
  projectId: "alias-online-13de4",
  storageBucket: "alias-online-13de4.appspot.com",
  messagingSenderId: "513511160334",
  appId: "1:513511160334:web:f856fc3504d446d6595a5f"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export const signInWithGoogle = async (): Promise<void> => {
  try {
    await signInWithPopup(auth, googleProvider)
  } catch (err: any) {
    console.error("Error while signing in.", err)
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut()
  } catch (err: any) {
    console.error("Error while signing out.", err)
  }
}

export const useFirebase = () => {
  const dispatch = useDispatch()
  const isLogged: boolean = useSelector((state: RootState) => state.user.isLogged)

  /**
   * Effect for updating user state on auth state change
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      console.log("Auth state changed. Updating user: ", authUser)
      dispatch(setName(authUser?.displayName ? authUser.displayName : ""))
      dispatch(setStatus(authUser ? true : false))
      dispatch(setPhotoURL(authUser?.photoURL ? authUser.photoURL : ""))
    })
    return () => unsubscribe()
  }, [dispatch])

  /**
   * Effect for fetching rooms from firestore
   */
  useEffect(() => {
    let unsubscribe: () => void = () => { }
    if (isLogged) {
      const roomsRef = collection(db, "rooms")
      unsubscribe = onSnapshot(roomsRef, (snapshot) => {
        const rooms: string[] = snapshot.docs.map((doc) => doc.data().name) as string[]
        dispatch(setRooms(rooms))
      }) 
    } else {
      dispatch(setRooms([]))
    }
    return () => unsubscribe()
  }, [dispatch, isLogged])

  /**
   * Effect for fetching users from firestore
   */
  useEffect(() => {
    let unsubscribe: () => void = () => { }
    if (isLogged) {
      const usersRef = collection(db, "users")
      unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const users: string[] = snapshot.docs.map((doc) => doc.data().displayName) as string[]
        dispatch(setUsers(users))
      }) 
    } else {
      dispatch(setUsers([]))
    }
    return () => unsubscribe()
  }, [dispatch, isLogged])

  return null
}
