import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import { Routes } from '@/types/routes'
import CreateJobManuallyForm from '@/components/for_pages/Lk/Jobs/Form'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { useState } from 'react'
import {VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import {CompanyOwnerWrapper} from '@/context/company_owner_state'


const CreateJobManuallyPageInner = () => {

  const [preview, setPreview] = useState<boolean>(false)

  return (
        <div className={styles.container}>
          {preview ? <PageTitle title={'Preview mode'} onBack={() => setPreview(false)} />
            : <PageTitle title={'Job Creating'} link={Routes.lkJobs} />}
          <CreateJobManuallyForm preview={preview} onPreview={() => setPreview(!preview)} />
        </div>
  )
}
const CreateJobManuallyPage = () => {
  return (<CompanyOwnerWrapper>
  <VacancyOwnerWrapper>
    <CreateJobManuallyPageInner/>
  </VacancyOwnerWrapper>
  </CompanyOwnerWrapper>)
}
CreateJobManuallyPage.getLayout = LkPageHirerLayout
export default  CreateJobManuallyPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
