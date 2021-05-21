import Layout from '../components/Layout'
import { AlertInfoProvider } from '../contexts/AlertInfoContexts'
import { CampiProvider } from '../contexts/CampiContexts'
import { SystemProvider } from '../contexts/SystemContexts'
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }) {
  if (router.pathname === '/') {
    return <Component {...pageProps} />
  }

  return (
    <Layout>
      <AlertInfoProvider>
        <SystemProvider>
          <CampiProvider>
            <Component {...pageProps} />
          </CampiProvider>  
        </SystemProvider>
      </AlertInfoProvider>
    </Layout>
  )
}

export default MyApp
