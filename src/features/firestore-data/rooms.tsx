import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import type { Room } from '../../firebase'

const Rooms: React.FC = () => {
  const rooms = useSelector((state: RootState) => state.firestore.rooms)

  return (
    <section className="mx-4">
      <h2 className="text-2xl mt-4">Rooms count: {rooms.length}</h2>
      { rooms.map((room: Room, index: number) => (
        <p className="mt-4" key={index}>Room {index}: {room.name}</p>
      ))}
    </section>
  )
}

export default Rooms
