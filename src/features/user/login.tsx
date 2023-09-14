import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { signInWithGoogle, signOut } from '../../firebase'

const Login: React.FC = () => {
  const isLogged: boolean = useSelector((state: RootState) => state.user.isLogged)

  return (
    <div className="mt-4 flex justify-center">
      { !isLogged &&
        <button
          type="button"
          className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => signInWithGoogle()}
        >
          Sign in with Google
        </button>
      }
      { isLogged &&
        <button
          type="button"
          className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      }
    </div>
  )
}

export default Login
