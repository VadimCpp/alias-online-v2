import React from 'react';
import { Link } from 'react-router-dom'

const About: React.FC = () => {
  return (
    <main className='mx-4 mt-2'>
      <p>
        This section will contain information about the game.
      </p>
      <p className="mb-8 mt-4">Press "Dictionary" button to open the dictionary</p>
      <Link to="/dictionary"
        className="rounded-md border border-transparent bg-blue-100 px-4 mt-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Dictionary
      </Link>
    </main>
  )
}

export default About
