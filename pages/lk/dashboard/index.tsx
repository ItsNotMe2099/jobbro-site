//import styles from './index.module.scss'

import LkLayout from '@/components/for_pages/Lk/components/layout'
import Layout from '@/components/layout/Layout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'


export default function DashBoard() {
  return (
    <Layout>
      <LkLayout>

      </LkLayout>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
