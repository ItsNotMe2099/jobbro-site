import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from './index.module.scss'
import LkLayout from "@/components/for_pages/Lk/components/layout"
import Layout from "@/components/for_pages/layout/Layout"
import { Routes } from '@/types/routes'
import CreateJobManuallyForm from '@/components/for_pages/Lk/Jobs/Form'


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
