import React from 'react'
import { request } from "../../lib/datocms"
import { Image } from 'react-datocms/image'


const aboutUs = (props) => {
    const { aboutProps } = props
  return (
    <>
    <div className="container flex flex-col m-auto w-5/6 sm:w-full">
        <div className="flex justify-center mb-40 mt-20 text-5xl">
            <h1 className=''>{aboutProps.page.title}</h1>
        </div>
        <div className='relative'>
            <Image data={aboutProps.page.mainImage.responsiveImage}></Image>
            <p className='xl:mt-14 lg:mt-48 mt-8'>{aboutProps.page.content.value.document.children[0].children[0].value}</p>
            <div className=" lg:bg-white lg:absolute lg:w-96 lg:p-6 p-0 xl:top-[-2.5%] xl:inset-x-[65%] lg:top-[-12%] lg:inset-x-[55%] w-full">
                <div className='flex flex-col'>
                    {aboutProps.page.content.value.document.children.map((element, key) => {
                        if (element.type === 'paragraph') {
                            return <p key={key} className='text-lg lg:text-black xl:text-black text-white my-2'><span>{element.children[0].value}</span></p>
                        }
                        else if (element.type === 'heading') {
                            if (element.level === 2) {
                                return <h2 key={key} className='text-3xl text-sky-400 my-2'>{element.children[0].value}</h2>
                            } else if (element.level === 3) {
                                return <h3 key={key} className='text-2xl text-green-400 my-1'>{element.children[0].value}</h3>
                            } 
                        }
                        else if (element.type === 'blockquote') {
                            return (
                                <blockquote key={key} className='ml-10 my-2'>
                                    {element.children.map((children) => {
                                        return( <p key={key} className='text-sky-400'>
                                            <span key={key} className='text-lg lg:text-black xl:text-black text-white'>{children.children[0].value}</span>
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