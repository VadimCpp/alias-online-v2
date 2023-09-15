import React from 'react'
import type { RootState } from '../../store'
import { useSelector } from 'react-redux'

const Rooms: React.FC = () => {
  const rooms = useSelector((state: RootState) => state.room.rooms)

  return (
    <section className="mx-4">
      <h2 className="text-2xl mt-4">Rooms count: {rooms.length}</h2>
      { rooms.map((room, index) => (
        <p className="mt-4" key={index}>Room {index}: {room}</p>
      ))}
    </section>
  )
}

export default Rooms
