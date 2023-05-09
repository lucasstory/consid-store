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
    const { description } = productData
    return (
      <div className="container flex flex-col m-auto">
        <div className="flex flex-col w-5/6 m-auto xl:flex-row xl:gap-40 xl:w-full">
          <div className="w-full xl:5/6">
            <Image data={productData.mainImage.responsiveImage}></Image>
          </div>
          <div className="flex flex-col lg:w-3/5">
            <h1 className="text-6xl font-bold mt-8">{productData.name}</h1>
            <h2 className="text-4xl my-8">{productData.price + "kr"}</h2>
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
            <div className="flex flex-row align-middle mt-10 gap-6">
              <div className="bg-color-slate-40">Slider</div>
              <button className="bg-gray-800 px-6 py-4 rounded-lg text-lg w-full hover:bg-slate-600">Add to cart</button>
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