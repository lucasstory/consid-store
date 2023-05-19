import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiOutlineInfoCircle, AiOutlineInbox } from 'react-icons/ai'
import { BiSupport } from 'react-icons/bi'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { loadCart } from '@/features/cart/cartSlice'
import { getSavedProducts } from '@/utils/localStorage'
import Cart from '../Cart/Cart'


/*
    Responsive Navbar that works well on all units.
*/

export const Navbar = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCart(getSavedProducts()))
    }, [])

    const { data } = props
    const [isOpen, setIsOpen] = useState(false);
    
    const [ showCart, setShowCart ] = useState(false)

  return (
    <nav className="flex flex-wrap items-center justify-between w-5/6 m-auto lg:w-full">
        {/* logo */}
        <Link href={`/`} className='mr-20'>
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
        className={`w-full block lg:gap-10 lg:justify-end lg:flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
        >
            <Link href={`/products`} className="flex flex-row items-center gap-2 mt-6 text-lg text-center text-white-200 lg:flex-col lg:gap-1 lg:mt-0 hover:text-orange-400" onClick={() => setIsOpen(!isOpen)}>
                <AiOutlineInbox size={25}></AiOutlineInbox>
                All products
            </Link>
            <Link href={`/about`} className="flex flex-row items-center gap-2 mt-6 text-lg text-center text-white-200 lg:flex-col lg:gap-1 lg:mt-0 hover:text-orange-400" onClick={() => setIsOpen(!isOpen)}>
                <AiOutlineInfoCircle size={25}></AiOutlineInfoCircle>
                About us
            </Link>
            <Link href={`/contact`} className="flex flex-row items-center gap-2 mt-6 text-lg text-center text-white-200 lg:flex-col lg:gap-1 lg:mt-0 hover:text-orange-400" onClick={() => setIsOpen(!isOpen)}>
                <BiSupport size={25}></BiSupport>
                Contact us
            </Link>
            
            {/* Cart */}
            <div className='relative' href={`/cart`} onClick={() => setIsOpen(false)} onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}>
                <Link href={`/cart`} className={`flex flex-row gap-2 mt-6 hover:text-orange-400 lg:mt-0 lg:block ${isOpen ? "block" : "hidden"}`}>
                    <AiOutlineShoppingCart size={30} className=''></AiOutlineShoppingCart>
                    Cart
                </Link>
                <div className={`absolute md:right-1/4 xl:right-1/4 z-50 ${showCart ? "block" : "hidden"}`}>
                    <Cart></Cart>
                </div>
            </div>
        </div>

  </nav>
  )
}

const PAGES_QUERY = `
query AllPages {
  allPages {
    slug
  }
}
`
export async function getStaticProps({ params }) {
  const data = await request({
      query: PAGES_QUERY
  })

  return {
    props: { data }
  }
}

export const getStaticPaths = async () => {
    const slugQuery = await request({
        query: PAGES_QUERY
    })
  
    let paths = []
    slugQuery.allPages.map((p) => paths.push(`/${p.id}`))
    return {
        paths,
        fallback: false
    }
  }