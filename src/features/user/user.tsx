import React from 'react'
import { useSelector } from 'react-redux'
import { UserIcon } from '@heroicons/react/20/solid'
import type { RootState } from '../../store'

const User: React.FC = () => {
  const name = useSelector((state: RootState) => state.user.displayName)
  const isLogged = useSelector((state: RootState) => state.user.isLogged)
  const photoURL = useSelector((state: RootState) => state.user.photoURL)

  return (
    <div className="p-4 w-64 mx-auto">
      <div className="text-center">
        { isLogged ?
          <img width="32" height="32"
            src={photoURL}
            alt={`Avatar of ${name}`}
            className="w-24 h-24 mx-auto rounded-full"
          /> :
          <div className="w-24 h-24 mx-auto  rounded-full">
            <UserIcon />
          </div>
        }
        <h2 className="text-xl font-semibold mt-4">{isLogged ? name : "Anonymous"}</h2>
      </div>
    </div>
  )
}

export default User
