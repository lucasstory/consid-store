"use client"

import React from 'react'
import { Header } from '../components/header/header'
import { Footer } from '../components/Footer/footer'
import { useEffect } from 'react'
import { getSavedProducts } from '@/utils/localStorage'
import { useDispatch } from 'react-redux'
import { loadCart } from '@/features/cart/cartSlice'


const MainLayout = ( { children } ) => {
  return (
    <>
    <Header></Header>
    {children}
    <Footer></Footer>
    </>
  )
}

export default MainLayout