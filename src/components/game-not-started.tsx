import React from 'react'
import { useSelector } from 'react-redux'
import { RocketLaunchIcon } from '@heroicons/react/20/solid'
import { startNewGame } from '../firebase'
import type { RootState } from '../store'
import type { User, Room } from '../firebase'

const GameNotStarted: React.FC = () => {
  const room: Room | null = useSelector((state: RootState) => state.game.room)
  const players: User[] = useSelector((state: RootState) => state.game.players)
  const uid: string | null = useSelector((state: RootState) => state.user.uid)

  const user: User | undefined = players.find((player: User) => player.uid === uid)

  if (!room || !user) {
    return null
  }

  return (
    <section className="mx-4 text-center">
      <div className="w-24 h-24 mx-auto rounded-full">
        <RocketLaunchIcon />
      </div>
      <h2 className="text-xl font-semibold mt-4">Game is not started.</h2>
      <p className="mt-4">Please press the button below to start the game.</p>
      <button
        type="button"
        className="rounded-md border border-transparent bg-blue-100 px-4 mt-4 mb-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={() => startNewGame(room, user)}
      >
        Start new game
      </button>
    </section>
  )
}

export default GameNotStarted
