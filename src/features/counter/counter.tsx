import React from 'react'
import type { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counter-slice'

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="mx-4">
      <div className="mt-4">
        <p className="text-2xl">Counter: {count}</p>
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
  )
}

export default Counter
