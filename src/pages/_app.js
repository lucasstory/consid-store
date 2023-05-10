import MainLayout from '@/layout/main-layout'
import '@/styles/globals.css'


import { Provider } from 'react-redux'

import productReducer, { productsFetch } from '@/features/product/productSlice'
import { productApi } from '@/features/product/productApi'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/features/cart/cartSlice'
import counterReducer from '../features/counter/counterSlice'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const store = configureStore({
  reducer: {
    products: productReducer,
    counter: counterReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productApi.middleware)
  }
})

store.dispatch(productsFetch())

export default function App({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
      <ToastContainer></ToastContainer>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </>
  )
}
