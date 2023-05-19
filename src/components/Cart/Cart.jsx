"use client"

import { useDispatch, useSelector } from "react-redux"
import { Image } from "react-datocms/image"
import { clearCart, decreaseCartQuantity, increaseCartQuantity, getTotal, removeFromCart } from '@/features/cart/cartSlice'
import { useEffect } from "react"
import { RxCross1 } from 'react-icons/rx'
import { IoIosArrowDropright } from 'react-icons/io'
import Link from "next/link"


const cart = () => {
    const cart = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotal())
    }, [cart])

    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }

    return (
        <div className="flex flex-col items-center justify-center m-auto text-black bg-gray-200 ">
            {cart.cartItems?.map(cartItem => (
                <div className="grid grid-flow-row divide-y divide-blue-200 auto-rows-max">
                    <div className="flex flex-row items-center gap-6">
                        <div className="flex flex-row items-start justify-start w-36">
                            <Image data={cartItem.mainImage.responsiveImage}></Image>
                        </div>
                        <div className="flex-col w-16">
                            <h3>{cartItem.name}</h3>
                            <p className="text-xl font-semibold">{cartItem.price}kr</p>
                        </div>
                        <div className="flex flex-col w-16">
                            <h3>{`Quantity`}</h3>
                            <p className="text-xl font-semibold">{`${cartItem.cartQuantity}`}</p>
                        </div>
                        <div className="p-2 mr-3 cursor-pointer hover:bg-gray-300" onClick={() => handleRemoveFromCart(cartItem)}>
                            <RxCross1></RxCross1>
                        </div>
                    </div>
                </div>

            ))}
            <Link href={`/cart`} className="flex justify-center gap-2 py-4 my-6 text-lg font-semibold bg-orange-400 w-72 felx-row hover:bg-orange-300">
                Go to cart
                <IoIosArrowDropright size={30}></IoIosArrowDropright>
            </Link>

        </div>
    )
}

export default cart