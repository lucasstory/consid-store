"use client"

import React from 'react'
import { request } from "../../lib/datocms"
import { Image } from 'react-datocms/image'


/*
  about.js is the about us page from DatoCMS.
*/

const aboutUs = (props) => {
    const { aboutProps } = props
  return (
    <>
    <div className="container flex flex-col w-5/6 m-auto sm:w-full">
        <div className="flex justify-center mt-20 mb-40 text-5xl">
            <h1 className=''>{aboutProps.page.title}</h1>
        </div>
        <div className='relative'>
            <Image data={aboutProps.page.mainImage.responsiveImage}></Image>
            <p className='mt-8 xl:mt-14 lg:mt-48'>{aboutProps.page.content.value.document.children[0].children[0].value}</p>
            <div className=" lg:bg-white lg:absolute lg:w-96 lg:p-6 p-0 xl:top-[-2.5%] xl:inset-x-[65%] lg:top-[-12%] lg:inset-x-[55%] w-full">
                <div className='flex flex-col'>
                    {aboutProps.page.content.value.document.children.map((element, key) => {
                        if (element.type === 'paragraph') {
                            return <p key={key} className='my-2 text-lg text-white lg:text-black xl:text-black'><span>{element.children[0].value}</span></p>
                        }
                        else if (element.type === 'heading') {
                            if (element.level === 2) {
                                return <h2 key={key} className='my-2 text-3xl font-bold text-orange-400'>{element.children[0].value}</h2>
                            } else if (element.level === 3) {
                                return <h3 key={key} className='my-1 text-2xl font-semibold text-gray-950'>{element.children[0].value}</h3>
                            } 
                        }
                        else if (element.type === 'blockquote') {
                            return (
                                <blockquote key={key} className='my-2 ml-10'>
                                  <svg aria-hidden="true" class="w-10 h-10 text-gray-400 dark:text-orange-400" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
                                    {element.children.map((children) => {
                                        return( <p key={key} className='text-sky-400'>
                                            <span key={key} className='text-lg text-white lg:text-black xl:text-black '>{children.children[0].value}</span>
                                        </p>
                                        )
                                    })}
                                </blockquote>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    </div>
</>
  )
}

const ABOUT_QUERY = `
query AboutPage {
    page(filter: {slug: {eq: "about"}}) {
      slug
      title
      content {
        blocks
        value
      }
      mainImage {
        responsiveImage(sizes: "", locale: en, fallbackLocales: en) {
          width
          webpSrcSet
          title
          srcSet
          src
          sizes
          height
          bgColor
          base64
          aspectRatio
          alt
        }
      }
    }
  }
`

export async function getStaticProps() {
    const aboutProps = await request({
      query: ABOUT_QUERY,
    });
    return {
      props: { aboutProps }
    };
  }
  


export default aboutUs