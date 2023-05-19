"use client"

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image } from 'react-datocms/image'
import Link from 'next/link'
import { IoIosArrowDropleft } from 'react-icons/io'
import { clearCart, decreaseCartQuantity, increaseCartQuantity, getTotal, removeFromCart } from '@/features/cart/cartSlice'
import { useEffect } from 'react'
import { AiOutlineCheckCircle, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'

const Cart = () => {
    const cart = useSelector((state) => state.cart)

    console.log(cart)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotal())
    }, [cart])

    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCartQuantity(cartItem))
    }

    const handleIncreaseCart = (cartItem) => {
        dispatch(increaseCartQuantity(cartItem))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

  return (
    <div className='container flex flex-col m-auto md:w-5/6 sm:w-full'>
        <h1 className='flex justify-center mt-10 mb-20 text-5xl'>Shopping cart</h1>
            { cart.cartItems.length === 0 ? (
                <div className='flex flex-col items-center gap-4 m-auto'>
                    <p>Your cart is currently empty.</p>
                    <Link href={`/products`} className='flex flex-row gap-2 hover:underline hover:text-orange-300'>
                        <IoIosArrowDropleft size={30}></IoIosArrowDropleft>
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className='flex flex-col m-auto md:w-5/6 lg:w-full'>
                    <div className='hidden lg:flex lg:flex-row lg:justify-between lg:font-bold lg:text-lg'>
                        <h3>Product</h3>
                        <h3>Quantity</h3>
                        <h3>Total</h3>
                    </div>
                    <hr className='hidden lg:my-6 lg:block'></hr>
                    <div className='flex flex-col gap-6 text-lg'>
                        {cart.cartItems?.map(cartItem => (
                            <div key={cartItem.id} className='flex flex-row items-center gap-10'>
                                <div className='w-40 lg:w-28'>
                                    <Image data={cartItem.mainImage.responsiveImage}></Image>
                                </div>
                                <div className='flex flex-col justify-center lg:flex-row lg:justify-between lg:w-full lg:items-center'>
                                    <div className='lg:w-1/2'>
                                        <h3 className='text-xl font-semibold'>{cartItem.name}</h3>
                                        <button className='hidden lg:block lg:text-purple-200 hover:underline lg:text-sm' onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                                    </div>
                                    <div className='flex flex-row justify-center gap-3 px-4 py-2 my-2 border-2 border-solid w-25 lg:items-center lg:mr-80'>
                                        <button className='flex flex-row justify-between' onClick={() => handleDecreaseCart(cartItem)}>
                                            <AiOutlineMinus size={20}></AiOutlineMinus>
                                        </button>
                                        <div className='text-xl'> {cartItem.cartQuantity}</div>
                                        <button onClick={() => handleIncreaseCart(cartItem)}>
                                            <AiOutlinePlus size={20}></AiOutlinePlus>
                                        </button>
                                    </div>
                                    <div className='text-xl text-left lg:w-1/3 lg:text-right '>{cartItem.price * cartItem.cartQuantity}kr</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className='my-6 lg:block lg:my-6'></hr>
                    <div className='flex flex-col justify-between gap-6'>
                        <div className='flex flex-row justify-between'>
                            <button className='flex flex-row items-center gap-3 hover:underline' onClick={() => handleClearCart()}>
                                <RxCross1></RxCross1>
                                Clear cart
                            </button>
                            <div className='text-xl font-bold'>
                                <span>Subtotal </span>
                                <span>{cart.cartTotalAmount}kr</span>
                            </div>
                        </div>
                        <p className='w-1/2'>*Taxes and shipping will be calculated at checkout.</p>
                        <div className='flex flex-col items-center justify-between gap-8 lg:flex-row'>
                            <Link href={`/products`} className='flex flex-row gap-2 hover:underline hover:text-orange-300'>
                                <IoIosArrowDropleft size={30}></IoIosArrowDropleft>
                                Continue Shopping
                            </Link>
                            <Link href={`/order-complete`} 
                                className='flex flex-row gap-4 px-6 py-4 text-xl font-bold text-black bg-orange-400 hover:bg-orange-300'
                                onClick={() => handleClearCart()}
                                >
                                Check out
                                <AiOutlineCheckCircle size={30}></AiOutlineCheckCircle>
                            </Link>
                        </div>
                    </div>
                </div>
            ) }
    </div>
  )
}

export default Cart