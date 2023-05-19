"use client"

import Link from "next/link"
import { request } from "../../lib/datocms"
import { Image } from 'react-datocms'
import { StructuredText } from "react-datocms"


/*
  This index.js is the home page.
*/

const HOMEPAGE_QUERY = `
query AllPages {
  startpage {
    title
    content {
      blocks
      value
    }
    mainImage {
      responsiveImage(fallbackLocales: en, imgixParams: {maxH: "1920", fit: crop}) {
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
  `;
export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: { data }
  };
}

export default function Home(props) {
  const { data } = props

  return (
    <div>
      <div className="relative overflow-hidden">
        <Image data={data.startpage.mainImage.responsiveImage}></Image>
        <div className="absolute inset-y-0 flex flex-col items-center justify-center inset-x-10 md:inset-x-20">
          <h1 class="text-4xl text-black font-semibold text-center md:text-5xl lg:text-6xl xl:text-8xl">{data.startpage.title}</h1>
          <Link href={`/products`} className="px-4 py-3 mt-6 text-base font-bold text-center text-black bg-orange-400 md:text-2xl md:py-6 md:px-8 animate-bounce md:mt-14 lg:mt-20" >See our stock</Link>
        </div>
      </div>
      <div className="container z-50 flex flex-col w-5/6 gap-5 p-10 m-auto mt-20 text-xl text-black bg-gray-200 lg:w-2/3 xl:w-1/3">
        <StructuredText data={data.startpage.content}></StructuredText>
      </div>
    </div>
   )
}