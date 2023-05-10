import React from 'react'
import { useSelector } from 'react-redux'
import { Image } from 'react-datocms/image'
import Link from 'next/link'
import { IoIosArrowDropleft } from 'react-icons/io'

const Cart = () => {
    const cart = useSelector((state) => state.cart)
  return (
    <div className='container flex flex-col m-auto w-5/6 sm:w-full'>
        <h1 className='flex justify-center mb-20 mt-10 text-5xl'>Shopping cart</h1>
        <div>
            { cart.cartItems.length === 0 ? (
                <div className='flex flex-col gap-4 items-center m-auto'>
                    <p>Your cart is currently empty</p>
                    <Link href={`/products`} className='hover:underline hover:text-yellow-400 flex flex-row gap-2'>
                        <IoIosArrowDropleft size={30}></IoIosArrowDropleft>
                        Continue Shopping
                    </Link>
                </div>
            ): (
                <div className='flex flex-col md:w-5/6 lg:w-full m-auto'>
                    <div className='lg:flex lg:flex-row lg:justify-between hidden lg:font-bold'>
                        <h3>Product</h3>
                        <h3>Quantity</h3>
                        <h3>Total</h3>
                    </div>
                    <hr className='lg:my-6 lg:block hidden'></hr>
                    <div className='flex flex-col gap-6 text-lg'>
                        {cart.cartItems?.map(cartItem => (
                            <div key={cartItem.id} className='flex flex-row gap-6'>
                                <div className='w-40 lg:w-28'>
                                    <Image data={cartItem.mainImage.responsiveImage}></Image>
                                </div>
                                <div className='flex flex-col justify-center lg:flex-row lg:justify-between lg:w-full lg:items-center'>
                                    <div className='lg:w-1/2'>
                                        <h3 className='font-semibold text-lg'>{cartItem.name}</h3>
                                        <button className='hidden lg:block lg:text-purple-200 hover:underline lg:text-sm'>Remove</button>
                                    </div>
                                    <div className='flex flex-row gap-3 lg:items-center lg:mr-80 border-solid border-2 w-20 justify-center py-2 px-10'>
                                        <button>-</button>
                                        <div> {cartItem.cartQuantity}</div>
                                        <button>+</button>
                                    </div>
                                    <div className='lg:w-1/3 lg:text-right text-left '>{cartItem.price * cartItem.cartQuantity}kr</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className='lg:block lg:my-6 hidden'></hr>
                    <div className='flex flex-col justify-between gap-6'>
                        <div className='flex flex-row justify-between'>
                        <button className='hover:underline'>Clear cart</button>
                            <div className='font-bold text-lg'>
                                <span>Subtotal </span>
                                <span>{cart.cartTotalAmount}kr</span>
                            </div>
                        </div>
                        <p className='w-1/2'>Taxes and shipping will be calculated at checkout.</p>
                        <div className='flex flex-row justify-between items-center'>
                            <Link href={`/products`} className='hover:underline hover:text-yellow-400 flex flex-row gap-2'>
                                <IoIosArrowDropleft size={30}></IoIosArrowDropleft>
                                Continue Shopping
                            </Link>
                            <Link href={`/order-complete`} className='bg-white text-black px-6 py-4 hover:bg-yellow-400 font-bold'>Check out</Link>
                        </div>
                    </div>
                </div>
            ) }
        </div>
    </div>
  )
}

export default Cart