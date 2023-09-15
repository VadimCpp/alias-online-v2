import React from 'react'
import type { RootState } from '../../store'
import { useSelector } from 'react-redux'

const Users: React.FC = () => {
  const users = useSelector((state: RootState) => state.room.users)

  return (
    <section className="mx-4">
      <h2 className="text-2xl mt-4">Users count: {users.length}</h2>
      { users.map((room, index) => (
        <p className="mt-4" key={index}>User {index}: {room}</p>
      ))}
    </section>
  )
}

export default Users
