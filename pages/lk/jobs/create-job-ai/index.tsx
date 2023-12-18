import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import { Routes } from '@/types/routes'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import {useEffect, useRef, useState} from 'react'
import {useVacancyGenerateAiContext, VacancyGenerateAiWrapper} from '@/context/vacancy_generate_ai'
import JobAiGenerateMessageForm from '@/components/for_pages/Lk/Jobs/JobAiGenerate/JobAiGenerateMessageForm'
import {Nullable} from '@/types/types'
// import JobAiStickyFooter from '@/components/for_pages/Lk/Jobs/JobAiGenerate/JobAiStickyFooter'
import CreateJobManuallyForm from '@/components/for_pages/Lk/Jobs/Form'
import IAiVacancyGenRequest from '@/data/interfaces/IAiVacancy'
import {VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import {CompanyOwnerWrapper} from '@/context/company_owner_state'


const CreateJobAiPageInner = () => {

  const [preview, setPreview] = useState<boolean>(false)
  const ref = useRef<Nullable<HTMLDivElement>>(null)

  const vacancyGenerateAiContext = useVacancyGenerateAiContext()
  console.log('vacancyGenerateAiContext', vacancyGenerateAiContext.request)
  const [initialRequest, setInitialRequest] = useState<Nullable<IAiVacancyGenRequest>>(null)

  useEffect(() => {
    const subscriptionUpdate = vacancyGenerateAiContext.requestUpdateState$.subscribe((request: IAiVacancyGenRequest) => {
     setInitialRequest(request)
    })
    return () => {
      subscriptionUpdate.unsubscribe()
    }
  }, [])
  return (
        <div className={styles.root} ref={ref} >
          {preview ? <PageTitle title={'Preview mode'} onBack={() => setPreview(false)} />
            : <PageTitle title={'Job Creating'} link={Routes.lkJobs} />}
          <div className={styles.form}>
            {initialRequest &&   <VacancyOwnerWrapper><CreateJobManuallyForm fromAi={true} initialValuesAi={vacancyGenerateAiContext.request?.result} preview={preview} onPreview={() => setPreview(!preview)}/></VacancyOwnerWrapper>}
          </div>
          {!preview && 
          // <JobAiStickyFooter boundaryElement={`.${styles.root}`} formRef={ref}>
          //   <div>
            <JobAiGenerateMessageForm/>
          //    </div>
          //  </JobAiStickyFooter>
        }
        </div>
  )
}
const CreateJobAiPage = () => {
  return ( <CompanyOwnerWrapper>
    <VacancyGenerateAiWrapper>
    <CreateJobAiPageInner/>
  </VacancyGenerateAiWrapper>
  </CompanyOwnerWrapper>)
}
CreateJobAiPage.getLayout = LkPageHirerLayout
export default  CreateJobAiPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
