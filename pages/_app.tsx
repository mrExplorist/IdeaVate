import DeleteQuestion from '@/components/DeleteQuestion'
import { checkWallet } from '@/services/blockchain'
import { store } from '@/store'
import '@/styles/global.css'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    checkWallet() // check if wallet is connected
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <DeleteQuestion />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        rtl={false}
        pauseOnFocusLoss
        hideProgressBar={false}
        newestOnTop={false}
        draggable={true}
        closeOnClick={true}
        pauseOnHover={true}
        theme="dark"
        limit={3}
      />
    </Provider>
  )
}
