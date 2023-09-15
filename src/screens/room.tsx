import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import Rooms from '../features/firestore-data/rooms'
import Users from '../features/firestore-data/users'
import RoomInfo from '../features/game/room-info'
import { GameState } from '../features/game/game-slice'

const Room: React.FC = () => {
  const state: GameState | null = useSelector((state: RootState) => state.game.state)

  return (
    <main>
      { state === GameState.NotStarted && <p>NotStarted</p> }
      { state === GameState.Explaining && <p>Explaining</p> }
      { state === GameState.ChooseWinner && <p>ChooseWinner</p> }
      { state === GameState.YouExplaining && <p>YouExplaining</p> }
      { state === GameState.WaitForWinner && <p>WaitForWinner</p> }
      { state === GameState.YouWin && <p>YouWin</p> }
      <hr />
      <RoomInfo />
      <hr />
      <Rooms />
      <Users />
    </main>
  )
}

export default Room
