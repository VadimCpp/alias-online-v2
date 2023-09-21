import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot } from "firebase/firestore"

import * as Types from './types'
import { setName, setPhotoURL, setStatus, setUid } from './features/user/user-slice'
import { setRooms, setUsers } from './features/firestore-data/firestore-data-slice'
import { setRoom, setPlayers, setState } from './features/game/game-slice'
import type { RootState } from './store'
import { db, auth, resetLeader, resetWinner } from './firebase'

/**
 * Function for checking if user is active.
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

/**
 * Game logic hook.
 */
const useGameLogic = () => {
  const dispatch = useDispatch()
  // user
  const isLogged: boolean = useSelector((state: RootState) => state.user.isLogged)
  const uid: string | null = useSelector((state: RootState) => state.user.uid)
  // firestore
  const rooms: Types.Room[] = useSelector((state: RootState) => state.firestore.rooms)
  const users: Types.User[] = useSelector((state: RootState) => state.firestore.users)
  // game
  const room: Types.Room | null = useSelector((state: RootState) => state.game.room)
  const players: Types.User[] = useSelector((state: RootState) => state.game.players)


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

  /**
   * Effect checking if leader and/or winner is still in the room. It resets the game if not.
   */
  useEffect(() => {
    const leaderUid: string | undefined = room?.leaderUid
    const winnerUid: string | undefined = room?.winnerUid
    const leader: Types.User | undefined = leaderUid ? players.find(p => p.uid === leaderUid) : undefined
    const winner: Types.User | undefined = winnerUid ? players.find(p => p.uid === winnerUid) : undefined
    if (room && !leader) {
      resetLeader(room);
    }
    if (room && !winner) {
      resetWinner(room);
    }
  }, [dispatch, players])

    
  return null
}

export default useGameLogic
