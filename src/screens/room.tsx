import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import * as Types from '../types'
import GameNotStarted from '../components/game-not-started'
import GuessTheCard from '../components/guess-the-card'
import YouExplaining from '../components/you-explaining'
import ChooseWinner from '../components/choose-winner'
import WaitForWinner from '../components/wait-for-winner'
import YouWin from '../components/you-win'

const Room: React.FC = () => {
  const state: Types.GameState | null = useSelector((state: RootState) => state.game.state)

  return (
    <main>
      { state === Types.GameState.NotStarted && <GameNotStarted /> }
      { state === Types.GameState.Explaining && <GuessTheCard /> }
      { state === Types.GameState.ChooseWinner && <ChooseWinner /> }
      { state === Types.GameState.YouExplaining && <YouExplaining /> }
      { state === Types.GameState.WaitForWinner && <WaitForWinner /> }
      { state === Types.GameState.YouWin && <YouWin /> }
    </main>
  )
}

export default Room
