import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Vocabulary from '../assets/vocabulary.json'
import { setState } from '../features/game/game-slice'
import type { RootState } from '../store'
import * as Types from '../types'
import PlayersRadioGroup from './players-radio-group'
import { setRoomWinner } from '../firebase'

const ChooseWinner: React.FC = () => {
  const room: Types.Room | null = useSelector((state: RootState) => state.game.room)
  const players: Types.User[] = useSelector((state: RootState) => state.game.players)
  const word: string | undefined = room?.word;
  
  const dispatch = useDispatch()

  const [winner, setWinner] = useState<Types.User | null>(null)

  if (!word) {
    return null
  }

  const wordObject: Types.Card | undefined = Vocabulary.find((wordObject) => wordObject.no === word)

  if (!wordObject) {
    return null
  }

  return (
    <section className="mx-4 text-center">
      <h2 className="text-xl font-semibold mt-4 mb-4">Choose the winner</h2>
      <PlayersRadioGroup players={players} onSelect={(player: Types.User) => { setWinner(player) }}/>
      { (winner && room) ? (
        <button
          type="button"
          className="rounded-md border border-transparent bg-blue-100 px-4 mb-4 mt-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setRoomWinner(room, winner) }
        >
          Confirm winner
        </button>
      ) : (
        <button
          type="button"
          className="rounded-md border border-transparent bg-gray-100 px-4 mb-4 mt-4 py-2 text-sm font-medium text-gray-300"
          disabled
        >
          Confirm winner
        </button>
      )}
      <p className="mb-4 mt-12">If noone guess the word, press the button below "Back to explaining"</p>
      <button
        type="button"
        className="rounded-md border border-transparent bg-blue-100 px-4 mb-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={() => dispatch(setState(Types.GameState.YouExplaining))}
      >
        Back to explaining
      </button>
    </section>
  )
}

export default ChooseWinner
