//import styles from './index.module.scss'
import {getAuthServerSideProps} from '@/utils/auth'
import {Routes} from '@/types/routes'
import {ProfileType} from '@/data/enum/ProfileType'


export default function IndexPage() {
  return null
}


export const getServerSideProps = getAuthServerSideProps(null, async (context, user) => {
  let redirect: string = '/admin'
  switch (user?.profileType){
    case ProfileType.Employee:
      redirect = Routes.profileResume
      break
    case ProfileType.Hirer:
      redirect = Routes.lkDashboard
      break
  }
  return {
    redirect: {
      permanent: false,
      destination: redirect
    }
  }
})
