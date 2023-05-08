import { getAllSlugs, getPostData } from "../../lib/posts"
import Link from "next/link"
import { request } from "../../lib/datocms"
import { Image } from "react-datocms/image"



const PATHS_QUERY = `
query allProducts {
  allProducts {
    id
  }
}
`

export default function ProductPage(props) {
    const { productData } = props
    return (
    <div>
        hej
    </div>
    )
}



const PRODUCT_QUERY = `
query Product ($id: ItemId) {
  product(filter: {id: {eq: $id}}) {
    name
    price
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
    id
  }
}
`