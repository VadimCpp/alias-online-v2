import React from 'react'
import { useSelector } from 'react-redux'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import type { RootState } from '../store'
import type { User, Room } from '../types'
import ResetGame from './reset-game'

const GuessTheCard: React.FC = () => {
  const room: Room | null = useSelector((state: RootState) => state.game.room)
  const players: User[] = useSelector((state: RootState) => state.game.players)

  const leaderUid: string | undefined = room?.leaderUid
  const currentExplainer: User | undefined = leaderUid ? players.find((player: User) => player.uid === leaderUid) : undefined

  return (
    <>
      { !!currentExplainer && (
        <section className="mx-4 text-center">
          <div className="w-24 h-24 mx-auto rounded-full">
            <QuestionMarkCircleIcon />
          </div>
          <h2 className="text-xl font-semibold mt-4">Guess the word.</h2>
          <p className="mt-4">{currentExplainer.displayName} is explaining the word now. Guess it!</p>
        </section>
      )}
      <ResetGame />
    </>
  )
}

export default GuessTheCard
