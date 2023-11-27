import 'normalize.css'
import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'rc-time-picker/assets/index.css'
import {AppContext, AppProps} from 'next/app'
import {getSelectorsByUserAgent} from 'react-device-detect'
import {isClient, isXsScreen} from 'utils/media'
import Cookies from 'js-cookie'
import {CookiesType} from 'types/enums'
import App from 'next/app'
import {AppWrapper} from '@/context/state'
import Head from 'next/head'
import {NextPage} from 'next'
import {ReactElement, ReactNode, useEffect} from 'react'
import ModalContainer from '@/components/layout/ModalContainer'
import Snackbar from '@/components/layout/Snackbar'
import 'react-datepicker/dist/react-datepicker.css'
import AppOverlay from '@/components/ui/AppOverlay'
import {ToastContainer} from 'react-toastify'
import BottomSheetContainer from '@/components/layout/BottomSheetContainer'
import {NotificationWrapper} from '@/context/notifications_state'
import {EventListWrapper} from '@/context/event_list_context'
import {FavoriteWrapper} from '@/context/favorite_state'
import {CandidateAddedWrapper} from '@/context/candidate_added_state'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {

  useEffect(() => {
      if (pageProps.isMobile) {
        document.body.classList.add('mobile-ua')
        document.documentElement.className = 'mobile-ua'
      }
    },
    [])
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <AppWrapper isMobile={pageProps.isMobile} token={pageProps.token}>
      <NotificationWrapper>
        <FavoriteWrapper>
          <CandidateAddedWrapper>
            <EventListWrapper>
              <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link
                  href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
                  rel="stylesheet"/>
                <link
                  href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap"
                  rel="stylesheet"/>
                <link
                  href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                  rel="stylesheet"/>
                <link
                  href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                  rel="stylesheet"/>
              </Head>
              {getLayout(<Component {...pageProps as any} />)}
              <ModalContainer/>
              <BottomSheetContainer/>
              <AppOverlay/>
              <Snackbar/>
              <ToastContainer
                closeButton={false}
                hideProgressBar={true}
                autoClose={3000}
                icon={<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.50453 10.6L1.95059 6.4L0.432617 7.8L6.50453 13.4L19.5158 1.4L17.9978 0L6.50453 10.6Z"
                        fill="#27AE60"/>
                </svg>
                }
              />
            </EventListWrapper>
          </CandidateAddedWrapper>
        </FavoriteWrapper>
      </NotificationWrapper>
    </AppWrapper>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext)

  if (appContext.ctx.req) {
    const ua = appContext.ctx.req.headers['user-agent']
    if (ua) {
      const {isMobile} = getSelectorsByUserAgent(ua)
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
