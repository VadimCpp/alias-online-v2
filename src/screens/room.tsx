import React from 'react'
import Dropdown from '../components/dropdown'

const Room: React.FC = () => {
  return (
    <main>
      <h1 className='text-4xl font-bold text-center mb-8 bg-gray-800 text-white py-8'>Room</h1>
      <div className='flex flex-wrap mx-4'>
        <p>TODO: room</p>
        <Dropdown />
      </div>
    </main>
  )
}

export default Room
