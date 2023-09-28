import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore"
import type { UserCredential, User as AuthUser } from 'firebase/auth'

import * as Types from './types'
import Vocabulary from './assets/vocabulary.json'

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
  try {
    const roomRef = doc(db, "rooms", room.uid);
    await updateDoc(roomRef, {
      winnerUid: winner.uid,
      winnerName: winner.displayName,
      winnerTimestamp: Date.now(),
      leaderUid: null,
      leaderName: null,
      leaderTimestamp: null,
    });
  } catch (err: any) {
    console.error("Error while setting winner.", err)
  }
}

export const updateWinnerScore = async (winner: Types.User) => {
  try {
    const userRef = doc(db, "users", winner.uid);
    await updateDoc(userRef, {
      score: winner.score + 1,
      lastActiveAt: Date.now(),
      greeting: false,
    });
  } catch (err: any) {
    console.error("Error while updating the score.", err)
  }
}

export const resetLeader = async (room: Types.Room) => {
  try {
    const roomRef = doc(db, "rooms", room.uid);
    await updateDoc(roomRef, {
      leaderUid: null,
      leaderName: null,
      leaderTimestamp: null,
    });
  } catch (err: any) {
    console.error("Error while resetting the leader.", err)
  }
}

export const resetWinner = async (room: Types.Room) => {
  try {
    const roomRef = doc(db, "rooms", room.uid);
    await updateDoc(roomRef, {
      winnerUid: null,
      winnerName: null,
      winnerTimestamp: null,
    });
  } catch (err: any) {
    console.error("Error while resetting the leader.", err)
  }
}

export const resetGame = async (room: Types.Room) => {
  try {
    const roomRef = doc(db, "rooms", room.uid);
    await updateDoc(roomRef, {
      leaderUid: null,
      leaderName: null,
      leaderTimestamp: null,
      winnerUid: null,
      winnerName: null,
      winnerTimestamp: null,
    });
  } catch (err: any) {
    console.error("Error while resetting the leader.", err)
  }
}
