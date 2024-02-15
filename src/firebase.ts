import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore"
import type { UserCredential, User as AuthUser } from 'firebase/auth'

import * as Types from './types'
import Vocabulary from './vocabulary'

const googleProvider = new GoogleAuthProvider()
const firebaseConfig = {
  apiKey: "AIzaSyDlwDcJwl6OhJLfAfvXDjL_MMEuwYbvGwQ",
  authDomain: "alias-online-test.firebaseapp.com",
  projectId: "alias-online-test",
  storageBucket: "alias-online-test.appspot.com",
  messagingSenderId: "1038371823294",
  appId: "1:1038371823294:web:c0276b1454f87b182208ef"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export const signInWithGoogle = async (): Promise<void> => {
  let signInSuccess: boolean = false
  let signInResult: UserCredential | null = null

  try {
    signInResult = await signInWithPopup(auth, googleProvider)
    signInSuccess = true
  } catch (err) {
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
  } catch (err) {
    console.error("Error while signing out.", err)
  }
}

/**
 * TODO: move this game logic to separate file, e.g. utils.ts
 */
const getRandomCard = (): Types.Card => {
  // NOTE! Emoji cards are not used anymore, but keeping this code for now.
  // TODO: remove this code when emoji cards are not used anymore.
  //const wordsWithEmoji: Types.Card[] = Vocabulary.filter(w => !!w['emoji']);
  const randomIndex: number = Math.ceil(Math.random() * (Vocabulary.length-1));
  return Vocabulary[randomIndex];
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    console.error("Error while resetting the leader.", err)
  }
}

export const resetCard = async (room: Types.Room) => {
  try {
    const roomRef = doc(db, "rooms", room.uid);
    await updateDoc(roomRef, {
      word: getRandomCard().no,
    });
  } catch (err) {
    console.error("Error while resetting a card.", err)
  }
}
