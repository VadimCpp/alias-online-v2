import type { RootState } from '../../store'
import { useSelector } from 'react-redux'

const User = () => {
  const name = useSelector((state: RootState) => state.user.name)
  const isLogged = useSelector((state: RootState) => state.user.isLogged)

  return (
    <div className="mx-4">
      <div className="mt-4">
        <p className="text-2xl">User: {name || "anonymous"}</p>
        <p className="text-2xl">Status: {isLogged ? "logged in" : "not logged in"}</p>
      </div>
    </div>
  )
}

export default User
