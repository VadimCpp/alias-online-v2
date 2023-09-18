import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import RoomInfo from '../features/game/room-info'
import { GameState } from '../features/game/game-slice'
import GameNotStarted from '../components/game-not-started'
import GuessTheCard from '../components/guess-the-card'

const Room: React.FC = () => {
  const state: GameState | null = useSelector((state: RootState) => state.game.state)

  return (
    <main>
      { state === GameState.NotStarted && <GameNotStarted /> }
      { state === GameState.Explaining && <GuessTheCard /> }
      { state === GameState.ChooseWinner && <p>ChooseWinner</p> }
      { state === GameState.YouExplaining && <p>YouExplaining</p> }
      { state === GameState.WaitForWinner && <p>WaitForWinner</p> }
      { state === GameState.YouWin && <p>YouWin</p> }
      <hr />
      <RoomInfo />
    </main>
  )
}

export default Room
