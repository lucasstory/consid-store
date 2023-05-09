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


const Products = (props) => {
    const { products } = props
    return (
        <>
        <div className="container flex flex-col m-auto">
            <div className="flex justify-center mb-20 text-4xl md:mb-40 md:mt-20 md:text-5xl">
                <h1>Alla produkter</h1>
            </div>
            <div className="flex content-center justify-center">
                <div className="grid grid-cols-1 gap-20 w-5/6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.allProducts?.map((product) => {
                        return (
                            <div key={product.id} className="cursor-pointer flex flex-col justify-between">
                                <div className="h-70">
                                    <Link href={`/products/${product.id}`}>
                                    <Image data={product.mainImage.responsiveImage}></Image>
                                    <div className="flex flex-col justify-center py-5">
                                        <h3 className="text-3xl font-semibold">{product.name}</h3>
                                        <h4 className="text-2xl">{product.price} kr</h4>
                                    </div>
                                    </Link>
                                </div>
                                <button className="bg-gray-800 px-6 py-4 w-full rounded-lg text-lg hover:bg-slate-600">Add to cart</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
    )
}
export default Products

export const getStaticProps = async ({ params }) => {
    const products = await request ({
        query: PRODUCTS_QUERY,
    })
    return {
        props: { products }
    }
}
