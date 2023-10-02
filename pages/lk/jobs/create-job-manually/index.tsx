import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from './index.module.scss'
import LkLayout from '@/components/for_pages/Lk/components/layout'
import Layout from '@/components/layout/Layout'
import { Routes } from '@/types/routes'
import CreateJobManuallyForm from '@/components/for_pages/Lk/Jobs/Form'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'


export default function CreateJobManually() {

  return (
    <Layout>
      <LkLayout>
        <div className={styles.container}>
          <PageTitle title='Job Creating' link={Routes.lkJobs} />
          <CreateJobManuallyForm />
        </div>
      </LkLayout>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
