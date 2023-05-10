import Link from "next/link"
import { request } from "../../../lib/datocms"
import { Image } from "react-datocms/image"
import { Counter } from "@/features/counter/Counter"
import { useDispatch } from "react-redux"
import { addToCart } from "@/features/cart/cartSlice"
import { StructuredText } from "react-datocms/structured-text"
import { useState } from "react"

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
    const { description } = productData

    let images  = []
    images.push(productData.mainImage.responsiveImage)

    const dispatch = useDispatch()
    const handleAddToCart = (productData) => {
        dispatch(addToCart(productData))
    }

    const [ showImage, setShowImage ] = useState(0)

    return (
      <div className="container flex flex-col m-auto">
        <div className="flex flex-col w-5/6 m-auto xl:flex-row xl:gap-40 xl:w-full">
          <div className="w-full xl:5/6">
            <Image data={productData.mainImage.responsiveImage} className="cursor-pointer"></Image>
          </div>
          <div className="w-full xl:5/6 flex flex-row gap-6 mt-6 cursor-pointer">
            {productData.alternativeImages.map((img, i) => {
              {images.push(img.responsiveImage)}
              return (
                <div className="w-96">
                  <Image data={img.responsiveImage} onClick={() => setShowImage(i)}></Image>
                </div>
              )
            })}
          </div>
          <div className="flex flex-col lg:w-5/6">
            <h1 className="text-6xl font-bold mt-8">{productData.name}</h1>
            <h2 className="text-4xl my-8">{productData.price + "kr"}</h2>
            <StructuredText data={description.content}></StructuredText>
            {description.value.document.children.map((element, key) => {
              if (element.type === 'paragraph') {
                return <span key={key} className="w-full">{element.children[0].value}</span>
              }
              else if (element.type === 'list') {
                return (
                <ul key={key} className="list-disc list-inside my-5">
                {element.children.map((e) => (
                  <li><span>{e.children[0].children[0].value}</span></li>
                ))}
                </ul>
                )
              }
            })}
            <div className="flex flex-row align-middle mt-10 gap-6 ">
              <Counter></Counter>
              <button className="bg-gray-800 px-6 py-4 rounded-lg text-lg w-72 hover:bg-slate-600" onClick={() => handleAddToCart(productData)}>Add to cart</button>
            </div>
          </div>
        </div>


        <div className="flex flex-col m-auto mt-20 w-5/6 xl:w-full">
          <h2 className="text-center mb-5 text-2xl">Description</h2>
          <hr></hr>
          <div className="mt-20">
          {description.value.document.children.map((element, key) => {
              if (element.type === 'paragraph') {
                return <span key={key}>{element.children[0].value}</span>
              }
              else if (element.type === 'list') {
                return (
                <ul key={key} className="list-disc list-inside my-5">
                {element.children.map((e) => (
                  <li><span>{e.children[0].children[0].value}</span></li>
                ))}
                </ul>
                )
              }
            })}
          </div>
        </div>
    </div>
    )
}



const PRODUCT_QUERY = `
query Product($id: ItemId) {
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
    description {
      value
    }
    alternativeImages {
      responsiveImage(sizes: "", fallbackLocales: en, locale: en) {
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