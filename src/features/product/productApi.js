"use client"

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


/*
  productApi imports all the products from dataCMS to initialize them to the Redux store.
*/

const getProductsQuery = `query AllProducts {
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
              }`

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://graphql.datocms.com' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: getProductsQuery,
            authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
        }),
    })
})

export const { useGetAllProductsQuery } = productApi