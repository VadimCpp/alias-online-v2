import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Vocabulary from '../assets/vocabulary.json'
import { setState } from '../features/game/game-slice'
import type { RootState } from '../store'
import * as Types from '../types'
import Card from './card'
import ResetCard from './reset-card'

const YouExplaining: React.FC = () => {
  const room: Types.Room | null = useSelector((state: RootState) => state.game.room)
  const word: string | undefined = room?.word;
  
  const dispatch = useDispatch()

  if (!word) {
    return null
  }

  const wordObject: Types.Card | undefined = Vocabulary.find((wordObject) => wordObject.no === word)

  if (!wordObject) {
    return null
  }

  return (
    <>
      <section className="mx-4 text-center">
        <h2 className="text-xl font-semibold mt-4 mb-4">Explain the word</h2>
        <Card {...wordObject} />
        <p className="mb-4">If someone guess the word, press the button below "Choose the winner"</p>
        <button
          type="button"
          className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => dispatch(setState(Types.GameState.ChooseWinner))}
        >
          Choose the winner
        </button>
      </section>
      <ResetCard />
    </>
  )
}

export default YouExplaining
