import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { ToastProvider } from '../context/ToastContext'
import { CartProvider } from '../context/CartContext'
import FloatingCart from '../components/FloatingCart'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
      <FloatingCart />
    </CartProvider>
  )
}

export default MyApp