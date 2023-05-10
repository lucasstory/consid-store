import Link from "next/link"
import { getAllPosts } from "../../lib/posts"
import { request } from "../../lib/datocms"
import { Image } from 'react-datocms'
import { Header } from "@/components/header/header"
import { StructuredText } from "react-datocms"

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
      <div className="relative">
        <Image data={data.startpage.mainImage.responsiveImage}
        ></Image>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 class="text-3xl text-black font-semibold text-center md:text-4xl lg:text-6xl xl:text-8xl">{data.startpage.title}</h1>
          <Link href={`/products`} className="absolute text-center text-xl text-black font-bold inset-x-80 bottom--20 bg-orange-400 mt-20 py-6 px-8 animate-bounce" >See our stock</Link>
        </div>
      </div>
      <div className="container mt-20 gap-5 w-1/3 flex flex-col m-auto z-50 bg-gray-200 text-black p-10">
        <StructuredText data={data.startpage.content}></StructuredText>
      </div>
    </div>
   )
}