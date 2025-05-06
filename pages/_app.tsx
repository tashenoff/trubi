import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastProvider } from '../context/ToastContext'
import { CartProvider } from '../context/CartContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ToastProvider>
  )
}

export default MyApp 