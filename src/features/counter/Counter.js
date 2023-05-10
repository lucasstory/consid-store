import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className='flex justify-center items-center'>
        <div className='flex flex-row w-40 border-solid border-2 justify-between px-6 py-2'>
          <button className='text-2xl' aria-label="Increment value" onClick={() => dispatch(increment())}>
              <AiOutlinePlus></AiOutlinePlus>
          </button>

          <span className='flex mx-6 text-2xl'>{count}</span>

          <button
          className='text-2xl'
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            <AiOutlineMinus></AiOutlineMinus>
          </button>
        </div>
    </div>
  )
}