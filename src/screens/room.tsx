import React from 'react'
import Rooms from '../features/firestore-data/rooms'
import Users from '../features/firestore-data/users'

const Room: React.FC = () => {
  return (
    <main>
      <Rooms />
      <Users />
    </main>
  )
}

export default Room
