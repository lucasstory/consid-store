"use client"

import React from 'react'
import Link from 'next/link'
import { IoIosArrowDropleft } from 'react-icons/io'

const orderComplete = () => {
  return (
    <div className='container flex flex-col w-5/6 m-auto sm:w-full'>
        <div className='h-screen'>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <h1 class="text-3xl text-white text-center md:text-4xl lg:text-6xl xl:text-8xl">
                    Order completed!
                </h1>
                <p className='mt-20 mb-20'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut arcu odio, facilisis eget purus ac, volutpat dapibus lectus. Fusce a nunc nulla. Nunc maximus efficitur sagittis. Fusce placerat eleifend purus sit amet congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed pretium nulla. Sed et dignissim nisi. Curabitur iaculis egestas nulla, ut accumsan est rutrum eu. Nunc fermentum mattis eros vitae pharetra. Curabitur sed elementum quam. Nunc sed elit eu erat aliquam porta eu ut ipsum. Morbi sed laoreet nisi, vitae interdum orci. Duis pharetra viverra euismod. Nulla vitae orci id sem gravida lobortis. Praesent vehicula sodales rutrum. Mauris faucibus, felis vel semper viverra, est ex iaculis ligula, non dignissim erat nisl eget orci.</p>
                <Link href={`/products`} className='flex flex-row items-center w-48 gap-3 px-6 py-4 text-lg font-bold text-black bg-orange-400 hover:bg-orange-300'>
                  <IoIosArrowDropleft size={30}></IoIosArrowDropleft>
                  Shop more
                </Link>
            </div>
           
        </div>
    </div>
  )
}

export default orderComplete