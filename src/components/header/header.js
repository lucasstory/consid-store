import Link from 'next/link'
import React, { useState } from 'react'
import { request } from "../../../lib/datocms"
import { Navbar } from './navbar'


export const Header = (props) => {
  return (
    <header className='container justify-center m-auto py-10'>
      <Navbar></Navbar>
    </header>
  )
}

const PAGES_QUERY = `
query AllPages {
  allPages {
    slug
  }
}
`
export async function getStaticProps({ params }) {
  const data = await request({
      query: PAGES_QUERY
  })

  return {
    props: { data }
  }
}