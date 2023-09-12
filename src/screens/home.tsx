import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppState, increment, decrement } from '../app-reducer';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: AppState) => state.counter);

  return (
    <main>
      <div className='mx-4'>
        <div className="mt-4">
          <p className="text-2xl">Counter: {counter}</p>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => dispatch(increment())}
          >
            Increment!
          </button>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => dispatch(decrement())}
          >
            Decrement!
          </button>
        </div>
      </div>
    </main>  
  );
};

export default Home
