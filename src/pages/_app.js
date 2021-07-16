import Layout from '../components/Layout'
import { AlertInfoProvider } from '../contexts/AlertInfoContexts'
import { CampiProvider } from '../contexts/CampiContexts'
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }) {
  if (router.pathname === '/') {
    return <Component {...pageProps} />
  }

  return (
    <AlertInfoProvider>
      <Layout>       
        <CampiProvider>
          <Component {...pageProps} />
        </CampiProvider>         
      </Layout>
    </AlertInfoProvider>
  )
}

export default MyApp
