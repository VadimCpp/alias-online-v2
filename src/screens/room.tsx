import React from 'react'
import Rooms from '../features/firestore-data/rooms'
import Users from '../features/firestore-data/users'
import RoomInfo from '../features/room/room-info'

const Room: React.FC = () => {
  return (
    <main>
      <RoomInfo />
      <hr />
      <Rooms />
      <Users />
    </main>
  )
}

export default Room
