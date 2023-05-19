"use client"

import React, { useState } from 'react'
import { Collapse } from 'react-collapse'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io'


export const AccordionItem = ({ open, toggle, title, items }) => {
  return (
    <div className=''>
        <div className=' text-white py-[25px] px-[50px] flex justify-between items-center cursor-pointer border-solid border-t-2 border-b-2 border-white'
        onClick={toggle}>
            <p className='text-[32px] font-semibold'>
                {title}
            </p>
            <div>
                <IoIosArrowDown size={30} className={open ? "rotate-180 transition-transform" : "rotate-0 transition-transform"}></IoIosArrowDown>
            </div>
        </div>

        <Collapse isOpened={open}>
            <div className=' text-white px-[50px] py-10 text-xl'>
                {items.map((i, k) => {
                    // Should be Link but pages do not exist, so for render purposes
                    // I added <p> for now.
                    return <p className='hover:underline' key={k}>{i}</p>
                })}
            </div>
        </Collapse>
    </div>
  )
}
