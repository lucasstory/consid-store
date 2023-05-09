import React, { useState } from 'react'
import Link from 'next/link'

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap">
        {/* logo */}
        <Link href={`/`} className='hover:text-green-500'>
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
            <span className="font-semibold text-xl tracking-tight">Tailwind CSS</span>
        </div>
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
        className={`w-full ml-5 block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
        >
            <div className="text-sm lg:flex-grow gap-10 flex">
                <Link href={`/products`} className="block mt-6 lg:inline-block lg:mt-0 text-white-200 text-lg hover:text-green-400" onClick={() => setIsOpen(!isOpen)}>All products</Link>
                <Link href={`/about-us`} className="block mt-6 lg:inline-block lg:mt-0 text-white-200 text-lg hover:text-green-400" onClick={() => setIsOpen(!isOpen)}>About us</Link>
                <Link href={`/contact`} className="block mt-6 lg:inline-block lg:mt-0 text-white-200 text-lg hover:text-green-400" onClick={() => setIsOpen(!isOpen)}>Contact us</Link>
            </div>
            <button className='mt-6 md:mt-0'>CART</button>
        </div>
  </nav>
  )
}
