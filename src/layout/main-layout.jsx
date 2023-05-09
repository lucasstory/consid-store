import React from 'react'
import { Header } from '../components/header/header'
import { Footer } from '../components/Footer/footer'

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