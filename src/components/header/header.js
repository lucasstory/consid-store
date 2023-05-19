import Link from 'next/link'
import React, { useState } from 'react'
import { request } from "../../../lib/datocms"
import { Navbar } from './navbar'


/*
    Header that renders the header with Navbar, visible on all pages.
*/

export const Header = (props) => {
  return (
    <header className='container justify-center py-10 m-auto'>
      <Navbar></Navbar>
    </header>
  )
}

