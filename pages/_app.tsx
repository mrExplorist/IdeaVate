import { AppProps } from 'next/app'
import '@/styles/global.css'
import DeleteQuestion from '@/components/DeleteQuestion'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { useEffect } from 'react'
import { checkWallet } from '@/services/blockchain'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    checkWallet()
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <DeleteQuestion />
    </Provider>
  )
}
