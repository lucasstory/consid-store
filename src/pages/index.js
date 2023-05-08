import Link from "next/link"
import { getAllPosts } from "../../lib/posts"
import { request } from "../../lib/datocms"
import { Image } from 'react-datocms'
import { Header } from "@/components/header/header"

const HOMEPAGE_QUERY = `{
  startpage {
    title
    content {
      blocks
      value
    }
    mainImage {
      alt(fallbackLocales: en, locale: en)
      blurhash
      responsiveImage(fallbackLocales: en, locale: en, sizes: "") {
        alt
        aspectRatio
        base64
        height
        sizes
        src
        title
        srcSet
        webpSrcSet
        width
        bgColor
      }
      filename
      _createdAt
      _updatedAt
      author
      basename
      copyright
      customData
      exifInfo
      format
      height
      id
      md5
      mimeType
      notes
      size
      smartTags
      thumbhash
      tags
      title(fallbackLocales: en, locale: en)
      url
      width
    }
  }
}`;
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
      <Image data={data.startpage.mainImage.responsiveImage}></Image>
      <h1 class="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{data.startpage.title}</h1>
    </div>
   )
}

const ProductPage = (props) => {
  const { data } = props
  return (
    <div>
      <Link href={`/products/${data.name}`}><h2>{data.title}</h2></Link>
      <p>{data.publishDate}</p>
      <p>{data.author}</p>
    </div>
  )
}