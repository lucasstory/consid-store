import Link from "next/link"
import { request } from "../../../lib/datocms"
import { Image } from "react-datocms/image"



const PRODUCTS_QUERY = `
query AllProducts {
    allProducts {
      id
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
      price
      name
    }
  }
`


export default function Products(props) {
    const { products } = props
    return (
        <>
        <div>hej</div>
        <div className="products">
            {console.log(products.allProducts)}
            {products.allProducts?.map((product) => {
                <div key={product.id}>{product.price}</div>
            })}
        </div>
    </>
    )
}

export const getStaticProps = async ({ params }) => {
    const products = await request ({
        query: PRODUCTS_QUERY,
    })
    return {
        props: { products }
    }
}