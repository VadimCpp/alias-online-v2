import React from 'react';
import Dropdown from '../components/dropdown'
import Card from '../components/card'
import Vocabulary from '../assets/vocabulary.json'

const Dictionary: React.FC = () => {
  return (
    <main>
      <h1 className='text-4xl font-bold text-center mb-8 bg-gray-800 text-white py-8'>Dictionary</h1>
      <p>TODO: profile</p>
      <Dropdown />
      <div className='flex flex-wrap mx-4'>
        {
          Vocabulary.map((word) => (
            <Card key={word['id']} {...word} />
          ))
        }
      </div>
    </main>
  )
}

export default Dictionary
