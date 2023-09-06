import Card from '../components/card'
import Vocabulary from '../assets/vocabulary.json'

function Dictionary() {
  return (
    <main>
      <h1 className='text-4xl font-bold text-center mb-8 bg-gray-800 text-white py-8'>Vocabulary (Autodeployed)</h1>
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
