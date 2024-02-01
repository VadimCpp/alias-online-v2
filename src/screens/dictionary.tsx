import React from 'react';
import Card from '../components/card'
import Vocabulary from '../vocabulary'

const Dictionary: React.FC = () => {
  return (
    <main className='flex flex-wrap mx-4'>
      {
        Vocabulary.map((word) => (
          <Card key={word['id']} {...word} />
        ))
      }
    </main>
  )
}

export default Dictionary
