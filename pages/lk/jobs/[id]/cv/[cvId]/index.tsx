import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAppContext} from '@/context/state'
import CvForHirerPage from '@/components/for_pages/Lk/Jobs/CvForHirerPage'
import ContentLoader from '@/components/ui/ContentLoader'
import {CvWrapper, useCvContext} from '@/context/cv_state'
import {useCvEvaluationContext} from '@/context/cv_evaluation_state'
import {Routes} from '@/types/routes'

const CvPageInner = () => {
  const appContext = useAppContext()
  const cvContext = useCvContext()
  const router = useRouter()
  const cv = cvContext.cv
  const cvEvaluationContext = useCvEvaluationContext()
  const vacancyId = parseInt(router.query.id as string, 10)
  const cvId = parseInt(router.query.cvId as string, 10)
  const evaluation = cvEvaluationContext.store[`${cvId}:${vacancyId}`]?.evaluation
  useEffect(() => {
    cvEvaluationContext.addRecord(cvId,vacancyId)
    return () => {
      cvEvaluationContext.removeRecord(cvId, vacancyId)
    }
  }, [cvId, vacancyId])
  return ((cvContext.loading || !cvContext?.cv) ? <ContentLoader style={'block'} isOpen={true}/>  :  <CvForHirerPage cv={cv!} evaluation={evaluation} backLink={Routes.lkJob(vacancyId)}/>
  )
}

const CvPage = () => {
  const router = useRouter()
  const cvId = parseInt(router.query.cvId as string, 10)
  return (<CvWrapper cvId={cvId}>
    <CvPageInner/>
  </CvWrapper>)
}
CvPage.getLayout = LkPageHirerLayout
export default CvPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
