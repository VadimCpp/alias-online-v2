import React from 'react'
import { useSelector } from 'react-redux'
import { TrophyIcon } from '@heroicons/react/20/solid'
import type { RootState } from '../store'
import * as Types from '../types'
import { updateWinnerScore, startNewGame } from '../firebase'

const YouWin: React.FC = () => {
  const room: Types.Room | null = useSelector((state: RootState) => state.game.room)
  const players: Types.User[] = useSelector((state: RootState) => state.game.players)
  const uid: string | null = useSelector((state: RootState) => state.user.uid)
  const user: Types.User | undefined = uid ? players.find((player: Types.User) => player.uid === uid) : undefined

  const onGetTropyhClick = async () => {
    if (room && user) {
      await updateWinnerScore(user);
      await startNewGame(room, user);
    }
  }

  return (
    <section className="mx-4 text-center">
      <h2 className="text-xl font-semibold mt-4 mb-4">You win</h2>
      <div className="w-24 h-24 mx-auto rounded-full">
        <TrophyIcon />
      </div>
      <p className="mb-4 mt-4">You get one point. It will be your turn. Press "Get the trophy"-button</p>
      <button
        type="button"
        className="rounded-md border border-transparent bg-blue-100 px-4 mb-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={onGetTropyhClick}
      >
        Get the trophy
      </button>
    </section>
  )
}

export default YouWin
