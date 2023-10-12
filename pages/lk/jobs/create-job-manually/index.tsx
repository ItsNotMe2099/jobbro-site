import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from './index.module.scss'
import LkLayout from '@/components/for_pages/Lk/components/layout'
import Layout from '@/components/layout/Layout'
import { Routes } from '@/types/routes'
import CreateJobManuallyForm from '@/components/for_pages/Lk/Jobs/Form'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { useState } from 'react'


export default function CreateJobManually() {

  const [preview, setPreview] = useState<boolean>(false)

  return (
    <Layout>
      <LkLayout>
        <div className={styles.container}>
          {preview ? <PageTitle title={'Preview mode'} onBack={() => setPreview(false)} />
            : <PageTitle title={'Job Creating'} link={Routes.lkJobs} />}
          <CreateJobManuallyForm preview={preview} onPreview={() => setPreview(!preview)} />
        </div>
      </LkLayout>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
