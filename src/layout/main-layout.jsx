import React from 'react'
import { Header } from '../components/header/header'

const MainLayout = ( { children } ) => {
  return (
    <>
    <Header></Header>
    {children}
    </>
  )
}

export default MainLayout