import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { request } from "../../../lib/datocms";

const initialState = {
    items: [],
    status: null,
    error: null
}

const endpoint = 'https://graphql.datocms.com'
const header = {
    'content-type': 'application/json',
    'Authorization': process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN
}

const graphqlQuery = {
    'query': `query AllProducts {
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
      }`,
      'variables': {}
}

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async(id=null, { rejectWithValue }) => {
        try {
            const res = await axios.request({
                method: 'post',
                url: endpoint,
                headers: header,
                data: graphqlQuery
            })
            return res.data
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)



const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = "pending"
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = "success"
            state.items = action.payload
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        }                 
    }
})

export default productsSlice.reducer