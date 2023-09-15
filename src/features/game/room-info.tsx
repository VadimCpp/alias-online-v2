import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import type { Room, User } from '../../firebase'
import { signInWithGoogle } from '../../firebase'

const RoomInfo: React.FC = () => {
  const room: Room | null = useSelector((state: RootState) => state.game.room)
  const players: User[] = useSelector((state: RootState) => state.game.players)
  const isLogged: boolean = useSelector((state: RootState) => state.user.isLogged)

  return (
    <section className="mx-4 mb-4">
      { room && (
        <h2 className="text-2xl mt-4">{room.name} ({players.length} players)</h2>
      )}
      { room && players.map((player: User, index: number) => (
        <p className="mt-4" key={index}>{player.displayName} ({player.score})</p>
      ))}
      { !room && (
        <>
          <h2 className="text-2xl mt-4">Knock-knock!</h2>
          <p className="mt-4">The room is not available.</p>
        </>
      )}
      { !room && !isLogged && (
        <>
          <p className="mt-4">Please sign in to join the room.</p>
          <button
            type="button"
            className="rounded-md border border-transparent bg-blue-100 px-4 mt-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => signInWithGoogle()}
          >
            Sign in with Google
          </button>
        </>
      )}
    </section>
  )
}

export default RoomInfo
