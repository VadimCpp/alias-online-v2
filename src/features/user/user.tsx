import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UserIcon } from '@heroicons/react/20/solid'
import type { RootState } from '../../store'
import * as Types from '../../types'
import { updateUserWhenGoToRoom } from '../../firebase'

const User: React.FC = () => {
  const name: string | null = useSelector((state: RootState) => state.user.displayName)
  const isLogged: boolean = useSelector((state: RootState) => state.user.isLogged)
  const photoURL: string | null = useSelector((state: RootState) => state.user.photoURL)
  const room: Types.Room | null = useSelector((state: RootState) => state.game.room)
  const users: Types.User[] = useSelector((state: RootState) => state.firestore.users)
  const uid: string | null = useSelector((state: RootState) => state.user.uid)
  const user: Types.User | undefined = users.find((u) => u.uid === uid)

  return (
    <div className="p-4 w-64 mx-auto">
      <div className="text-center">
        { isLogged && name && photoURL ?
          <img width="24" height="24"
            src={photoURL}
            alt={`Avatar of ${name}`}
            className="w-24 h-24 mx-auto rounded-full"
          /> :
          <div className="w-24 h-24 mx-auto rounded-full">
            <UserIcon />
          </div>
        }
        <h2 className="text-xl font-semibold mt-4">{isLogged ? name : "Anonymous"}</h2>
      </div>
      { isLogged &&
        <div className="text-center mt-8">
          <Link to="/room"
            className="rounded-md border border-transparent bg-blue-100 px-4 mt-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={async () => { 
              if (room && user) {
                await updateUserWhenGoToRoom(room, user)
              }
            }}
          >
            Play
          </Link>
        </div>
      }
    </div>
  )
}

export default User
