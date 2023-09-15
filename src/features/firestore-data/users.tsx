import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import type { User } from '../../firebase'

const Users: React.FC = () => {
  const users = useSelector((state: RootState) => state.firestore.users)

  return (
    <section className="mx-4">
      <h2 className="text-2xl mt-4">Users count: {users.length}</h2>
      { users.map((user: User, index: number) => (
        <p className="mt-4" key={index}>User {index}: {user.displayName}, {user.score}</p>
      ))}
    </section>
  )
}

export default Users
