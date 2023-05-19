"use client"

/*
    util file that saves the cart to localStorage.
*/

export const getSavedProducts = () => {

    const data = JSON.parse(localStorage.getItem('cartItems'))

    if(!data) return []

    return data
}

export const setCartItems = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items))

    return getSavedProducts()
}