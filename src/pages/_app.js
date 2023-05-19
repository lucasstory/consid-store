import MainLayout from '@/layout/main-layout'
import '@/styles/globals.css'

import { Provider } from 'react-redux'

import productReducer, { productsFetch } from '@/features/product/productSlice'
import { productApi } from '@/features/product/productApi'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { getTotal, loadCart } from '@/features/cart/cartSlice'
import counterReducer from '../features/counter/counterSlice'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { getSavedProducts } from '@/utils/localStorage'
import { useDispatch } from 'react-redux'
import { debounce } from 'debounce'
import { loadState, saveState } from '@/utils/localStorage'


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
store.dispatch(getTotal())

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
