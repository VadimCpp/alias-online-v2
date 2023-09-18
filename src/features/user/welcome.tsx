import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GlobeAltIcon } from '@heroicons/react/20/solid'
import type { RootState } from '../../store'
import { signInWithGoogle } from '../../firebase'

const Welcome: React.FC = () => {
  const isLogged: boolean = useSelector((state: RootState) => state.user.isLogged)
  const name: string | null = useSelector((state: RootState) => state.user.displayName)
  const photoURL: string | null = useSelector((state: RootState) => state.user.photoURL)

  return (
    <div className="text-center">
      { !isLogged && (
        <>
          <div className="w-24 h-24 mx-auto rounded-full">
            <GlobeAltIcon />
          </div>
          <h2 className="text-xl font-semibold mt-4">Welcome to Alias Online!</h2>
          <p className="mt-4">Please sign in to start the game</p>
          <button
            type="button"
            className="rounded-md border border-transparent bg-blue-100 px-4 mt-8 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => signInWithGoogle()}
          >
            Sign in with Google
          </button>
        </>
      )}
      { isLogged && photoURL && name && (
        <>
          <img width="24" height="24"
            src={photoURL}
            alt={`Avatar of ${name}`}
            className="w-24 h-24 mx-auto rounded-full"
          />
          <h2 className="text-xl font-semibold mt-4">Welcome, {name}!</h2>
          <p className="mb-8 mt-4">Press "Play" button to open the playing room</p>
          <Link to="/room"
            className="rounded-md border border-transparent bg-blue-100 px-4 mt-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => { console.log('room') }} 
          >
            Play
          </Link>
        </>
      )}
    </div>
  )
}

export default Welcome
