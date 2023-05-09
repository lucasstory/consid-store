import React from 'react'
import { Collapse } from 'react-collapse'
import Link from 'next/link'

export const AccordionItem = ({ open, toggle, title, items }) => {

  return (
    <div className=''>
        <div className='bg-black text-white py-[25px] px-[50px] flex justify-between items-center cursor-pointer border-solid border-t-2 border-b-2 border-white'
        onClick={toggle}>
            <p className='text-[32px] font-semibold'>
                {title}
            </p>
            <div className='text-[30px] text-white'>X</div>
        </div>

        <Collapse isOpened={open}>
            <div className='bg-black  text-white px-[50px] py-10 text-xl'>
                {items.map((i) => {
                    return <p className='hover:underline'>{i}</p>
                })}
            </div>
        </Collapse>
    </div>
  )
}
