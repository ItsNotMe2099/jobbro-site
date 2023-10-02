import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from './index.module.scss'
import LkLayout from '@/components/for_pages/Lk/components/layout'
import Layout from '@/components/layout/Layout'
import YourCompanyForm from '@/components/for_pages/Lk/YourCompany/Form'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'


export default function YourCompany() {

  return (
    <Layout>
      <LkLayout>
        <div className={styles.container}>
          <PageTitle title='Your Company' />
          <YourCompanyForm />
        </div>
      </LkLayout>
    </Layout>
  )
}

export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
