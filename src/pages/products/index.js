import Link from "next/link"
import { request } from "../../../lib/datocms"
import { useGetAllProductsQuery } from "@/features/product/productApi"
import { useSelector } from "react-redux"
import { Image } from "react-datocms/image"
import { useDispatch } from "react-redux"
import { addToCart } from "@/features/cart/cartSlice"
import { AiOutlineShoppingCart } from 'react-icons/ai/'

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
    const dispatch = useDispatch()
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    const { products } = props
    return (
        <>
        <div className="container flex flex-col m-auto">
            <div className="flex justify-center mb-20 text-4xl md:mb-40 md:mt-20 md:text-5xl">
                <h1>Alla produkter</h1>
            </div>
            <div className="flex content-center justify-center">
                <div className="grid grid-cols-1 gap-10 w-5/6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.allProducts?.map((product) => {
                        return (
                            <div key={product.id} className="cursor-pointer flex flex-col justify-between bg-gray-300 hover:scale-105 ease-in-out duration-200">
                                <div className="h-96 flex flex-col justify-between text-gray-950">
                                    <Link href={`/products/${product.id}`}>
                                        <div className="px-3 pt-3">
                                            <Image data={product.mainImage.responsiveImage}></Image>
                                        </div>
                                        <div className="flex flex-col justify-center py-5 px-3">
                                            <h3 className="text-2xl font-semibold">{product.name}</h3>
                                            <h4 className="text-3xl mt-7 font-bold">{product.price} kr</h4>
                                        </div>
                                    </Link>
                                    <button onClick={() => handleAddToCart(product)} className="flex flex-row gap-2 justify-center bg-orange-400  font-semibold py-4 w-full text-lg hover:bg-orange-300">
                                        <AiOutlineShoppingCart size={30}></AiOutlineShoppingCart>
                                        Add to cart
                                    </button>    
                                </div>
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
