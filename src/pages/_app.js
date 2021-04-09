import Layout from '../components/Layout'
import { AlertInfoProvider } from '../contexts/AlertInfoContexts'
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }) {
  if (router.pathname === '/') {
    return <Component {...pageProps} />
  }

  return (
    <Layout>
      <AlertInfoProvider>
        <Component {...pageProps} />
      </AlertInfoProvider>
    </Layout>
  )
}

export default MyApp
