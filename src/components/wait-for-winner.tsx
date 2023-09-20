import React from 'react'
import { useSelector } from 'react-redux'
import { ClockIcon } from '@heroicons/react/20/solid'
import type { RootState } from '../store'
import * as Types from '../types'

const WaitForWinner: React.FC = () => {
  const room: Types.Room | null = useSelector((state: RootState) => state.game.room)
  const players: Types.User[] = useSelector((state: RootState) => state.game.players)
  const winner: Types.User | undefined = room ? players.find((player: Types.User) => player.uid === room.winnerUid) : undefined

  if (!room || !winner) {
    return null
  }

  return (
    <section className="mx-4 text-center">
      <h2 className="text-xl font-semibold mt-4 mb-4">Wait</h2>
      <div className="w-24 h-24 mx-auto rounded-full">
        <ClockIcon />
      </div>
      <p className="mb-4 mt-4">{winner.displayName} won the raund. Wait for him to get the trohy 🏆</p>
    </section>
  )
}

export default WaitForWinner
