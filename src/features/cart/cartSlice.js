"use client"

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setCartItems } from "@/utils/localStorage";
import { useSelector } from "react-redux";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addSingleItemToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`Increased ${state.cartItems[itemIndex].name} quantity`, {
                    position: "bottom-right"
                })
            } else {
                const tempProduct = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProduct)
                toast.success(`Added ${action.payload.name} to cart`, {
                    position: "bottom-right"
                })
            }

            setCartItems(state.cartItems)
        },
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload[0].id)

            if (itemIndex >= 0) {
                let quan = action.payload[1]
                state.cartItems[itemIndex].cartQuantity += quan
                console.log(state.cartItems[itemIndex].cartQuantity)
                toast.info(`Increased ${state.cartItems[itemIndex].name} quantity`, {
                    position: "bottom-right"
                })
            } else {
                let quan = action.payload[1]
                const tempProduct = {...action.payload[0], cartQuantity: quan}
                state.cartItems.push(tempProduct)
                toast.success(`Added ${action.payload[0].name} to cart`, {
                    position: "bottom-right"
                })
            }

            setCartItems(state.cartItems)
        },
        removeFromCart(state, action) {
            const newCartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )
            state.cartItems = newCartItems
            toast.error(`Removed ${action.payload.name} from cart`, {
                position: "bottom-right"
            })
            setCartItems(state.cartItems)
        },
        decreaseCartQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(cartItem => cartItem.id = action.payload.id)

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1

                toast.info(`Decreased ${state.cartItems[itemIndex].name} quantity`, {
                    position: "bottom-right"
                })
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const newCartItems = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
                state.cartItems = newCartItems
                toast.error(`Removed ${action.payload.name} from cart`, {
                    position: "bottom-right"
                })
            }
            setCartItems(state.cartItems)
        },
        increaseCartQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(cartItem => cartItem.id = action.payload.id)
            state.cartItems[itemIndex].cartQuantity += 1
            setCartItems(state.cartItems)
        },
        clearCart(state, action) {
            state.cartItems = []

            toast.error(`Emptied your cart`, {
                position: "bottom-right"
            })
            setCartItems(state.cartItems)
        },
        getTotal(state, action) {
            let { total, quantity } = state.cartItems.reduce((cartTotalAmount, cartItem) => {
                const { price, cartQuantity } = cartItem
                const itemTotal = price * cartQuantity

                cartTotalAmount.total += itemTotal
                cartTotalAmount.quantity += cartQuantity

                return cartTotalAmount
            }, {
                total: 0,
                quantity: 0
            })

            state.cartTotalQuantity = quantity
            state.cartTotalAmount = total
        },
        loadCart(state, action) {
            action.payload.map((item) => {
                state.cartItems.push(item)
            })
        }
    }
})

export const { addSingleItemToCart, addToCart, removeFromCart, decreaseCartQuantity, increaseCartQuantity, clearCart, getTotal, loadCart } = cartSlice.actions

export default cartSlice.reducer