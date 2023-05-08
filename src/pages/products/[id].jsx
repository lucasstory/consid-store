import { getAllSlugs, getPostData } from "../../../lib/posts"
import Link from "next/link"
import { request } from "../../../lib/datocms"
import { Image } from "react-datocms/image"



const PATHS_QUERY = `
query allProducts {
  allProducts {
    id
  }
}
`

export const getStaticPaths = async () => {
  const slugQuery = await request({
      query: PATHS_QUERY
  })

  let paths = []
  slugQuery.allProducts.map((p) => paths.push(`/products/${p.id}`))
  return {
      paths,
      fallback: false
  }
}


export default function ProductPage(props) {
    const { productData } = props
    return (
    <div>
      <Image data={productData.mainImage.responsiveImage}></Image>
      <h1>{productData.name}</h1>
      <h2>{productData.price + " kr"}</h2>
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

export const getStaticProps = async ({ params }) => {
    const product = await request ({
        query: PRODUCT_QUERY,
        variables: { id: params.id }

    })
    return {
        props: {
            productData: product.product
        }
    }
}