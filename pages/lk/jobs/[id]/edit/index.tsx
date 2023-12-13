import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import { Routes } from '@/types/routes'
import CreateJobManuallyForm from '@/components/for_pages/Lk/Jobs/Form'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { useState } from 'react'
import {useVacancyOwnerContext, VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import {useRouter} from 'next/router'
import ContentLoader from '@/components/ui/ContentLoader'
import {CompanyOwnerWrapper} from '@/context/company_owner_state'


const JobEditPageInner = () => {

  const [preview, setPreview] = useState<boolean>(false)
  const vacancyContext = useVacancyOwnerContext()
  return (
        <div className={styles.container}>
          {preview ? <PageTitle title={'Preview mode'} onBack={() => setPreview(false)} />
            : <PageTitle title={'Edit Job'} link={Routes.lkJobs} />}
          {vacancyContext.loading ? <ContentLoader style={'block'} isOpen={true}/> : <CreateJobManuallyForm preview={preview} onPreview={() => setPreview(!preview)} />}
        </div>
  )
}
const JobEditPage = () => {
  const router = useRouter()
  return (<CompanyOwnerWrapper>
    <VacancyOwnerWrapper  vacancyId={parseInt(router.query.id as string, 10)}>
    <JobEditPageInner/>
    </VacancyOwnerWrapper>
  </CompanyOwnerWrapper>)
}
JobEditPage.getLayout = LkPageHirerLayout
export default  JobEditPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
