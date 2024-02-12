import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from '@/pages/lk/jobs/[id]/clone/index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import { Routes } from '@/types/routes'
import CreateJobManuallyForm from '@/components/for_pages/Lk/Jobs/Form'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { useState } from 'react'
import {useVacancyOwnerContext, VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import {CompanyOwnerWrapper} from '@/context/company_owner_state'
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from 'next/router'
import ContentLoader from '@/components/ui/ContentLoader'


const CreateJobManuallyPageInner = () => {
  const { t } = useTranslation()
  const [preview, setPreview] = useState<boolean>(false)
  const vacancyContext = useVacancyOwnerContext()
  return (
        <div className={styles.container}>
          {preview ? <PageTitle title={'Preview mode'} onBack={() => setPreview(false)} />
            : <PageTitle title={t('job_create_manually_title')} link={Routes.lkJobs} />}
          {vacancyContext.loading ? <ContentLoader style={'block'} isOpen={true}/> : <CreateJobManuallyForm preview={preview} onPreview={() => setPreview(!preview)} />}
        </div>
  )
}
const CreateJobManuallyPage = () => {
  const router = useRouter()
  return (<CompanyOwnerWrapper>
    <VacancyOwnerWrapper isClone={true}  vacancyId={parseInt(router.query.id as string, 10)}>
    <CreateJobManuallyPageInner/>
  </VacancyOwnerWrapper>
  </CompanyOwnerWrapper>)
}
CreateJobManuallyPage.getLayout = LkPageHirerLayout
export default  CreateJobManuallyPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
