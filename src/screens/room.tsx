import React from 'react'
import Rooms from '../features/room/rooms'
import Users from '../features/room/users'

const Room: React.FC = () => {
  return (
    <main>
      <Rooms />
      <Users />
    </main>
  )
}

export default Room
