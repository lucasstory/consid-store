import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Image from 'next/image'

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap w-5/6 m-auto lg:w-full">
        {/* logo */}
        <Link href={`/`} className='mr-10'>
            <Image src='/lucas-logo.png' width={150} height={100}></Image>
        </Link>
        {/* Burger */}
        <div className="block lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400">
                <svg
                className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
                <svg
                className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
            </button>
        </div>
        {/* Links */}
        <div
        className={`w-full block lg:gap-10 lg:flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
        >
                <Link href={`/products`} className="block mt-6 lg:inline-block lg:mt-0 text-white-200 text-lg hover:text-orange-400" onClick={() => setIsOpen(!isOpen)}>All products</Link>
                <Link href={`/about-us`} className="block mt-6 lg:inline-block lg:mt-0 text-white-200 text-lg hover:text-orange-400" onClick={() => setIsOpen(!isOpen)}>About us</Link>
                <Link href={`/contact`} className="block mt-6 lg:inline-block lg:mt-0 text-white-200 text-lg hover:text-orange-400" onClick={() => setIsOpen(!isOpen)}>Contact us</Link>

        </div>
        <Link href={`/cart`} className={`block mt-6 lg:mt-0 lg:block ${isOpen ? "block" : "hidden"}`}>
            <AiOutlineShoppingCart size={30} className='hover:text-orange-400'></AiOutlineShoppingCart>
        </Link>
  </nav>
  )
}
