import 'normalize.css'
import '../styles/globals.scss'
import { AppContext, AppProps } from 'next/app'
import { getSelectorsByUserAgent } from 'react-device-detect'
import { isClient, isXsScreen } from 'utils/media'
import Cookies from 'js-cookie'
import { CookiesType } from 'types/enums'
import App from 'next/app'
import { AppWrapper } from '@/context/state'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AppWrapper isMobile={pageProps.isMobile} token={pageProps.token}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext)

  if (appContext.ctx.req) {
    const ua = appContext.ctx.req.headers['user-agent']
    if (ua) {
      const { isMobile } = getSelectorsByUserAgent(ua)
      props.pageProps.isMobile = isMobile
    } else {
      props.pageProps.isMobile = false
    }
    if ((appContext.ctx.req as any).cookies) {
      props.pageProps.token = (appContext.ctx as any).req.cookies[CookiesType.accessToken]
    }
  } else if (isClient) {
    props.pageProps.isMobile = isXsScreen()
    props.pageProps.token = Cookies.get(CookiesType.accessToken)
  }

  return props
}

// export default appWithTranslation(MyApp)
export default MyApp
