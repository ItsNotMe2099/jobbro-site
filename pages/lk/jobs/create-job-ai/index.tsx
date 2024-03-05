import styles from './index.module.scss'

import PageTitle from '@/components/for_pages/Common/PageTitle'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import { Routes } from '@/types/routes'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { useEffect, useRef, useState} from 'react'
import {useVacancyGenerateAiContext, VacancyGenerateAiWrapper} from '@/context/vacancy_generate_ai'
import JobAiGenerateMessageForm from '@/components/for_pages/Lk/Jobs/JobAiGenerate/JobAiGenerateMessageForm'
import {Nullable} from '@/types/types'
import CreateJobManuallyForm from '@/components/for_pages/Lk/Jobs/Form'
import IAiVacancyGenRequest from '@/data/interfaces/IAiVacancy'
import {VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import {CompanyOwnerWrapper} from '@/context/company_owner_state'
import useTranslation from 'next-translate/useTranslation'
import ProgressLine from '@/components/ui/ProgressLine'


const CreateJobAiPageInner = () => {

  const { t } = useTranslation()
  const [preview, setPreview] = useState<boolean>(false)
  const ref = useRef<Nullable<HTMLDivElement>>(null)
  const vacancyGenerateAiContext = useVacancyGenerateAiContext()
  const [initialRequest, setInitialRequest] = useState<Nullable<IAiVacancyGenRequest>>(null)
  const [percents, setPercents] = useState<number>(2)
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0)
  const interval = useRef<any>(null)

  const getRandomArbitrary =(min:number, max: number) => {
    return Math.random() * (max - min) + min
  }

  useEffect(() => {
    const subscriptionUpdate = vacancyGenerateAiContext.requestUpdateState$.subscribe((request: IAiVacancyGenRequest) => {
     setInitialRequest(request)
    })
    return () => {
      subscriptionUpdate.unsubscribe()
    }
  }, [])

  const textsArray = ['job_aiLoader_text1', 'job_aiLoader_text2', 'job_aiLoader_text3', 'job_aiLoader_text4', 'job_aiLoader_text5', 'job_aiLoader_text6']


  // const initPreloader = useCallback((stop?: boolean) => {   
  //   if(stop){
  //     clearInterval(interval.current)
  //     setPercents(2)
  //     setCurrentTextIndex(0)
  //     return
  //   }
  //   interval.current = setInterval(()=>{
  //     setCurrentTextIndex(state=> state < textsArray.length - 1 ? state + 1 : 0)
  //     percents <= 85&&setPercents(state=> state + 15)
  //   }, 1250)
  // }, [currentTextIndex])

  useEffect(()=>{
    if(percents > 5) {
      const timeoutMS = getRandomArbitrary(1500, 2500)
      const percentsRandom = getRandomArbitrary(15, 30)
      setTimeout(()=> {
        setPercents(state=> state + percentsRandom)
        setCurrentTextIndex(state=> state < textsArray.length - 1 ? state + 1 : 0)
      }, timeoutMS)
    }  
  }, [percents])

  useEffect(()=>{
    vacancyGenerateAiContext.loading&&setPercents(10)
  }, [vacancyGenerateAiContext.loading])


  return (
        <div className={styles.root} ref={ref} >
          {preview ? <PageTitle title={t('Preview mode')} onBack={() => setPreview(false)} />
            : <PageTitle title={t('job_create_ai_title')} link={Routes.lkJobs} />}
          <div className={styles.form}>
            {initialRequest && !vacancyGenerateAiContext.loading &&   <VacancyOwnerWrapper><CreateJobManuallyForm fromAi={true} initialValuesAi={vacancyGenerateAiContext.request?.result} preview={preview} onPreview={() => setPreview(!preview)}/></VacancyOwnerWrapper>}
            {vacancyGenerateAiContext.loading &&
            <div className={styles.loader}>
              <div className={styles.loaderItem}>
                <p className={styles.loaderDescription}>{t(textsArray[currentTextIndex])}</p>
                <ProgressLine percents={percents}/>
              </div>
            </div>
            }
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
