import styles from './index.module.scss'
import {useRouter} from 'next/router'
import VacancyRepository from '@/data/repositories/VacancyRepository'
import {IVacancyWithCurrentUserApply} from '@/data/interfaces/IVacancy'
import JobPreview from '@/components/for_pages/Lk/Jobs/JobPreview'
import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next/types'
import {CookiesType, ModalType} from '@/types/enums'
import Layout from '@/components/layout/Layout'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import {useRef} from 'react'
import {useAppContext} from '@/context/state'
import {ApplicationCreateModalArguments} from '@/types/modal_arguments'
import useTranslation from 'next-translate/useTranslation'
import {RequestError} from '@/types/types'
import ChatOnPage from '@/components/for_pages/Common/ChatOnPage'
import ApplyForJobForm from '@/components/for_pages/Common/ApplyForJobForm'
import {useEmployeeAiCvRequestsContext} from '@/context/employee_cv_request_state'
import {AiRequestStatus} from '@/data/enum/AiRequestStatus'

interface Props {
  job: IVacancyWithCurrentUserApply
}

const JobPageInner = (props: Props) => {
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size
  const {isSmDesktopWidth} = appContext.size
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement | null>(null)

  const employeeAiCvRequests = useEmployeeAiCvRequestsContext()
  const request = employeeAiCvRequests.requests.length > 0 ? employeeAiCvRequests.requests[0] : null

  const openApplicationModal = () => {
    if(isTabletWidth) {
      appContext.showBottomSheet(ModalType.ApplicationCreate, {vacancyId: props.job?.id} as ApplicationCreateModalArguments)
      return
    }
    appContext.showModal(ModalType.ApplicationCreate, {vacancyId: props.job?.id} as ApplicationCreateModalArguments)
  }



  return (<Layout hideTabbar>
      <div className={styles.root}>
        <div ref={ref} className={styles.container} id='idVacancyContainer'>
          <JobPreview job={props.job} company={props.job.company}/>
          {!isSmDesktopWidth && (request && (!([AiRequestStatus.InQueue, AiRequestStatus.InProgress] as AiRequestStatus[]).includes(request.status) && !(request?.status === AiRequestStatus.Finished && request.vacancyId === props.job.id && !request.cv?.isChecked))) &&
          <FormStickyFooter boundaryElement={'#idVacancyContainer'} formRef={ref} className={styles.footer}>
            <Button spinner={false} type='submit' styleType='large' color='green'
                    onClick={() => openApplicationModal()}>
              {t('job_preview_button_apply')}
            </Button>
          </FormStickyFooter>}
        </div>
        {!isSmDesktopWidth && (!props.job.applicationByCurrentUser && !props.job.proposalToCurrentUser) &&
          <ApplyForJobForm vacancyId={props.job.id}/>
        }
        {!isSmDesktopWidth && (props.job.applicationByCurrentUser || props.job.proposalToCurrentUser) &&
        <ChatOnPage vacancyId={props.job.id} cvId={props.job.applicationByCurrentUser?.cvId ?? props.job.proposalToCurrentUser?.cvId}/>}
      </div>
    </Layout>
  )
}
const JobPage = (props: Props) => {
  const router = useRouter()
  return (<JobPageInner {...props}/>)
}

export default JobPage
export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const id = parseInt(context.query.id as string, 10)
  const token = context.req.cookies[CookiesType.accessToken]
  try {
    const job = await VacancyRepository.fetchById(id, token)
    console.log('job1', job)
    return {
      props: {
        job
      }
    }
  }catch (e) {
    console.error(e)
    if(e instanceof RequestError){
      if(e.isNotFoundError){
        return {
          notFound: true
        }
      }
    }
    throw e
  }

}
