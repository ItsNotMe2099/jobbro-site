import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from './index.module.scss'
import {LkPageLayout} from '@/components/for_pages/Lk/components/LkLayout'
import { Routes } from '@/types/routes'
import CreateJobManuallyForm from '@/components/for_pages/Lk/Jobs/Form'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { useState } from 'react'


const CreateJobManuallyPage = () => {

  const [preview, setPreview] = useState<boolean>(false)

  return (
        <div className={styles.container}>
          {preview ? <PageTitle title={'Preview mode'} onBack={() => setPreview(false)} />
            : <PageTitle title={'Job Creating'} link={Routes.lkJobs} />}
          <CreateJobManuallyForm preview={preview} onPreview={() => setPreview(!preview)} />
        </div>
  )
}
CreateJobManuallyPage.getLayout = LkPageLayout
export default  CreateJobManuallyPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
