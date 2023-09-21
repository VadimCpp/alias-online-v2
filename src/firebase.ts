import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, onSnapshot, doc, updateDoc, setDoc } from "firebase/firestore"
import type { UserCredential, User as AuthUser } from 'firebase/auth'

import * as Types from './types'
import Vocabulary from './assets/vocabulary.json'
import { setName, setPhotoURL, setStatus, setUid } from './features/user/user-slice'
import { setRooms, setUsers } from './features/firestore-data/firestore-data-slice'
import { setRoom, setPlayers, setState } from './features/game/game-slice'
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
  let signInSuccess: boolean = false
  let signInResult: UserCredential | null = null

  try {
    signInResult = await signInWithPopup(auth, googleProvider)
    signInSuccess = true
  } catch (err: any) {
    console.error("Error while signing in.", err)
  }

  if (signInSuccess && signInResult) {
    try {
      const user: AuthUser = signInResult.user;
      const userDoc = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        score: 0,
        lastActiveAt: Date.now(),
        role: 'spiller',
        isActive: true,
        greeting: false,
        room: "norsk-room",
      };
      await setDoc(doc(db, "users", user.uid), userDoc);
    } catch (err) {
      console.error("Error setting the document for signed in used.", err);
    }
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut()
  } catch (err: any) {
    console.error("Error while signing out.", err)
  }
}

/**
 * TODO: move this game logic to separate file, e.g. utils.ts
 */
const getRandomCard = (): Types.Card => {
  const wordsWithEmoji: Types.Card[] = Vocabulary.filter(w => !!w['emoji']);
  const randomIndex: number = Math.ceil(Math.random() * (wordsWithEmoji.length-1));
  return wordsWithEmoji[randomIndex];
}

/**
 * TODO: move this game logic to separate file, e.g. utils.ts
 */
const isActive = (user: Types.User): boolean => {
  if (!user?.lastActiveAt) {
    return false;
  }
  const today: Date = new Date();
  const lastActiveAt: Date = new Date(user?.lastActiveAt);
  const lastActiveHoursAgo: number = (+today - +lastActiveAt) / 1000 / 60 / 60;
  return (lastActiveHoursAgo < 1);
}

export const startNewGame = async (room: Types.Room, user: Types.User): Promise<void> => {
  try {
    const roomRef = doc(db, "rooms", room.uid);
    await updateDoc(roomRef, {
      leaderUid: user.uid,
      leaderName: user.displayName,
      leaderTimestamp: Date.now(),
      winnerUid: null,
      winnerName: null,
      winnerTimestamp: null,
      word: getRandomCard().no,
    });
  } catch (err: any) {
    console.error("Error while starting new game.", err)
  }
}

export const updateUserWhenGoToRoom = async (room: Types.Room, user: Types.User): Promise<void> => {
  try {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      room: room.uid,
      lastActiveAt: Date.now(),
      greeting: false,
    });
  } catch (err: any) {
    console.error("Error while updating user going to the room.", err)
  }
}

export const setRoomWinner = async (room: Types.Room, winner: Types.User): Promise<void> => {
  const roomRef = doc(db, "rooms", room.uid);
  await updateDoc(roomRef, {
    winnerUid: winner.uid,
    winnerName: winner.displayName,
    winnerTimestamp: Date.now(),
    leaderUid: null,
    leaderName: null,
    leaderTimestamp: null,
  });
}

export const updateWinnerScore = async (winner: Types.User) => {
  const userRef = doc(db, "users", winner.uid);
  await updateDoc(userRef, {
    score: winner.score + 1,
    lastActiveAt: Date.now(),
    greeting: false,
  });
}

export const useFirebase = () => {
  const dispatch = useDispatch()
  const isLogged: boolean = useSelector((state: RootState) => state.user.isLogged)
  const uid: string | null = useSelector((state: RootState) => state.user.uid)
  const rooms: Types.Room[] = useSelector((state: RootState) => state.firestore.rooms)
  const users: Types.User[] = useSelector((state: RootState) => state.firestore.users)
  const room: Types.Room | null = useSelector((state: RootState) => state.game.room)

  /**
   * Effect for updating user state on auth state change
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      console.log("Auth state changed. Updating user: ", authUser)
      dispatch(setName(authUser?.displayName ? authUser.displayName : null))
      dispatch(setStatus(authUser ? true : false))
      dispatch(setPhotoURL(authUser?.photoURL ? authUser.photoURL : null))
      dispatch(setUid(authUser?.uid ? authUser.uid : null))
    })
    return () => unsubscribe()
  }, [dispatch])

  /**
   * Effect for fetching all rooms from firestore
   */
  useEffect(() => {
    let unsubscribe: () => void = () => { }
    if (isLogged) {
      const roomsRef = collection(db, "rooms")
      unsubscribe = onSnapshot(roomsRef, (snapshot) => {
        const rooms: Types.Room[] = snapshot.docs.map((doc) => doc.data()) as Types.Room[]
        dispatch(setRooms(rooms))
      }) 
    } else {
      dispatch(setRooms([]))
    }
    return () => unsubscribe()
  }, [dispatch, isLogged])

  /**
   * Effect for fetching all users from firestore
   */
  useEffect(() => {
    let unsubscribe: () => void = () => { }
    if (isLogged) {
      const usersRef = collection(db, "users")
      unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const users: Types.User[] = snapshot.docs.map((doc) => doc.data()) as Types.User[]
        dispatch(setUsers(users))
      }) 
    } else {
      dispatch(setUsers([]))
    }
    return () => unsubscribe()
  }, [dispatch, isLogged])

  /**
   * Effect for updating current room.
   * 
   * NOTE!
   * Only one room with uid "norsk-room" is supported.
   */
  useEffect(() => {
    console.log("Updating room")
    if (rooms.length === 1 && rooms[0].uid === "norsk-room") {
      dispatch(setRoom(rooms[0]))
    } else {
      dispatch(setRoom(null))
    }
  }, [dispatch, rooms])

  /**
   * Effect for updating current room's players.
   */
  useEffect(() => {
    dispatch(setPlayers(room ? users.filter(user => isActive(user) && user.room === room.uid) : []))
  }, [dispatch, room, users])

  /**
   * Effect for updating current room's state.
   */
  useEffect(() => {
    if (room && !room?.leaderUid && !room?.winnerUid) {
      dispatch(setState(Types.GameState.NotStarted))
    } else if (room?.leaderUid && uid && room?.leaderUid !== uid) {
      dispatch(setState(Types.GameState.Explaining))
    } else if (room?.leaderUid && uid && room?.leaderUid === uid) {
      dispatch(setState(Types.GameState.YouExplaining))
    } else if (room?.winnerUid && uid && room?.winnerUid !== uid) {
      dispatch(setState(Types.GameState.WaitForWinner))
    } else if (room?.winnerUid && uid && room?.winnerUid === uid) {
      dispatch(setState(Types.GameState.YouWin))
    } else {
      dispatch(setState(null))
    }
  }, [dispatch, room])

  return null
}
