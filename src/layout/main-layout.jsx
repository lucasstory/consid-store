"use client"

import React from 'react'
import { Header } from '../components/header/header'
import { Footer } from '../components/Footer/footer'


/*
  main-layout.jsx sets the overall layout for all pages on the website.
*/

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