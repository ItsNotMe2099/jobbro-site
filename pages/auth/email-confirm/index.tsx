import AuthRepository from '@/data/repositories/AuthRepository'
import {CookiesType} from '@/types/enums'
import {CookiesLifeTime} from '@/types/constants'
import {setCookie} from 'nookies'
import {Routes} from '@/types/routes'
import Button from '@/components/ui/Button'
import ErrorPage from '@/components/for_pages/error/ErrorPage'

interface Props {
  error: string
}

export default function Registration(props: Props) {

  if (props.error) {
    return (<ErrorPage title={`Error hapened: ${props.error ? props.error : ''}`}>
      <Button href={'/'} type='submit'  styleType='large' color='green'>
        Main
      </Button>
    </ErrorPage>)
  }
}
export const getServerSideProps = async (context: any) => {
  const code = context.query.code as string
  const email = context.query.email as string
  if (!code && !email) {
    return {notFound: true}
  }
  try {
    const res = await AuthRepository.confirmEmail({email, code})
    setCookie(context, CookiesType.accessToken, res.accessToken, {
      maxAge: CookiesLifeTime.accessToken,
      path: '/'
    })
    return {
      props: {},
      redirect: {
        destination: Routes.lk,
        permanent: false,
      },
    }
  } catch (e) {
    return {
      props: {error: (e as any)?.message ?? e as string}
    }
  }

  return {}
}
