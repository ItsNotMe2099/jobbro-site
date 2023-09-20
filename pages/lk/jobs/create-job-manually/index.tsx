import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from './index.module.scss'
import LkLayout from "@/components/for_pages/Lk/components/layout"
import Layout from "@/components/for_pages/layout/Layout"
import { Routes } from '@/types/routes'
import { useState } from 'react'
import CreateJobManuallyForm from '@/components/for_pages/Lk/Jobs/Form'


export default function CreateJobManually() {

  const [form, setForm] = useState<'ad' | 'application' | 'workflow'>('ad')

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
