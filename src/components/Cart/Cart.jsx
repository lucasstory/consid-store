import { useSelector } from "react-redux"
import { useState } from "react"
import { Image } from "react-datocms/image"




const cart = (cartItems) => {
    const [ showCart, setShowCart ] = useState(false)
    const cart = useSelector((state) => state.cart)

    return (
        <div className={`w-full bg-black/25 fixed right-0 top-0 z-10 text-black ${showCart ? "hidden" : "block"}`}>
            <div className='h-screen w-[600px] bg-white float-right py-[40px] px-[10px] relative'>
                <button className="text-black" type='button' onClick={ () => setShowCart(!showCart) }>
                    Back to shopping
                </button>
        
                <div className='mt-10'>
                    {cart.cartItems.length === 0 ? (
                        <div>
                            <h1>Your cart is empty</h1>
                        </div>
                    ) : (
                        <div>
                            {cart.cartItems?.map(cartItem => (
                                <div>
                                    <div className="flex flex-row gap-6 justify-center">
                                        <div className="w-60">
                                            <Image data={cartItem.mainImage.responsiveImage}></Image>
                                        </div>
                                        <div className="flex-col">
                                            <h3>{cartItem.name}</h3>
                                            <h3>{cartItem.price}kr</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) }
                </div>
            </div>
      </div>
    )
}

export default cart