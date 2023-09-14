import React from 'react'
import type { RootState } from '../../store'
import { useSelector } from 'react-redux'

const Rooms: React.FC = () => {
  const rooms = useSelector((state: RootState) => state.room.rooms)

  return (
    <div className="mx-4">
      <div className="mt-4">
        <p className="text-2xl">Rooms count: {rooms.length}</p>
      </div>
      { rooms.map((room, index) => (
        <div className="mt-4" key={index}>
          <p className="text-2xl">Room {index}: {room}</p>
        </div>
      ))}
    </div>
  )
}

export default Rooms
