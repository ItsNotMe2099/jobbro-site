//import styles from './index.module.scss'

import Layout from '@/components/layout/Layout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'


export default function DashBoard() {
  return (
    <Layout>

    </Layout>
  )
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
