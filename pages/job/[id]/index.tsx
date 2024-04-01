import styles from './index.module.scss'
import {useRouter} from 'next/router'
import VacancyRepository from '@/data/repositories/VacancyRepository'
import {IVacancy, IVacancyWithCurrentUserApply} from '@/data/interfaces/IVacancy'
import JobPreview from '@/components/for_pages/Lk/Jobs/JobPreview'
import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next/types'
import {CookiesType, ModalType} from '@/types/enums'
import Layout from '@/components/layout/Layout'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import {useEffect, useMemo, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {ApplicationCreateModalArguments} from '@/types/modal_arguments'
import useTranslation from 'next-translate/useTranslation'
import {Nullable, RequestError} from '@/types/types'
import ChatOnPage from '@/components/for_pages/Common/ChatOnPage'
import ApplyForJobForm from '@/components/for_pages/Common/ApplyForJobForm'
import {useEmployeeAiCvRequestsContext} from '@/context/employee_cv_request_state'
import {IApplyForJobModal} from '@/components/modals/ApplyForJobModal'
import {MyEvents} from '@/components/for_pages/Calendar/MyEvents'
import ContentLoader from '@/components/ui/ContentLoader'
import {IApplication} from '@/data/interfaces/IApplication'
import {JobPostingJsonLd, NextSeo} from 'next-seo'
import {IJobChatModal} from '@/components/modals/JobChatModal'
import {format} from 'date-fns'
import ImageHelper from '@/utils/ImageHelper'
import {SalaryType} from '@/data/enum/SalaryType'
import {Employment} from '@/data/enum/Employment'
import EntityViewRepository, {EntityViewType} from '@/data/repositories/EntityViewRepository'
import {serverRuntimeConfig, runtimeConfig} from '@/config/runtimeConfig'

const getSalaryUnitJsonLd = (vacancy: IVacancy):      'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' => {
  switch (vacancy.salaryType){
    case SalaryType.perHour:
      return 'HOUR'
    case SalaryType.perYear:
      return 'YEAR'
    case SalaryType.perMonth:
    default:
      return 'MONTH'
  }
}
const getEmploymentJsonLd = (vacancy: IVacancy):    'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN' | 'VOLUNTEER' | 'PER_DIEM' | 'OTHER' => {
  switch (vacancy.employment){
    case Employment.Apprenticeship:
    return 'OTHER'
    case Employment.Casual:
      return 'TEMPORARY'
    case Employment.Traineeship:
      return 'INTERN'
    case Employment.Contract:
      return 'CONTRACTOR'
    case Employment.PartTime:
      return 'PART_TIME'
    case Employment.FullTime:
    default:
      return 'FULL_TIME'
  }
}
enum SideBarType {
  Apply = 'apply',
  Calendar = 'calendar',
  Chat = 'chat'
}

interface Props {
  job: IVacancyWithCurrentUserApply
}

const JobPageInner = (props: Props) => {
  console.log(props.job)
  const appContext = useAppContext()
  const [newApplication, setNewApplication] = useState<Nullable<IApplication>>(null)
  const {isTabletWidth} = appContext.size
  const {isSmDesktopWidth} = appContext.size
  const {t} = useTranslation()
  const ref = useRef<HTMLDivElement | null>(null)
  const hasApplication = !!newApplication || (!!props.job.applicationByCurrentUser || !!props.job.proposalToCurrentUser)
  const employeeAiCvRequests = useEmployeeAiCvRequestsContext()
  const request = employeeAiCvRequests.requests.length > 0 ? employeeAiCvRequests.requests[0] : null
  const canShowContent = (appContext.allLoaded && !appContext.isLogged) || employeeAiCvRequests.initialLoaded
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const subscriptionApplication = appContext.applicationCreateState$.subscribe((application) => {
      setNewApplication(application)
    })
    return () => {
      subscriptionApplication.unsubscribe()
    }
  }, [])

  const sideBarType = useMemo<SideBarType>(() => {
    if (employeeAiCvRequests.isShowApplyForm) {
      return SideBarType.Apply
    } else if (!employeeAiCvRequests.isShowApplyForm && hasApplication) {
      return SideBarType.Chat
    } else {
      return SideBarType.Calendar
    }
  }, [employeeAiCvRequests.isShowApplyForm, hasApplication])

  const openApplicationModal = () => {
    appContext.showModal(ModalType.ApplicationCreate, {vacancyId: props.job?.id} as ApplicationCreateModalArguments)
  }

  const openApplyModal = () => {
    switch (sideBarType) {
      case SideBarType.Apply:
        appContext.showBottomSheet<IApplyForJobModal>(ModalType.ApplyForJobModal, {vacancyId: props.job.id})
        break
      case SideBarType.Calendar:
        if (hasApplication) {
          appContext.showBottomSheet(ModalType.MyEventsModal)
        } else {
          appContext.showBottomSheet(ModalType.ApplicationCreate, {vacancyId: props.job?.id} as ApplicationCreateModalArguments)
        }
        break
      case SideBarType.Chat:
        appContext.showModal<IJobChatModal>(ModalType.JobChatModal, {
          vacancyId: props.job.id,
          cvId: props.job.applicationByCurrentUser?.cvId ?? props.job.proposalToCurrentUser?.cvId,
          replace: true

        } as IJobChatModal)
        break
    }
  }

  return (<Layout hideTabbar>
      <NextSeo
        title={props.job.name}
        description={props.job.intro.visible ? props.job.intro.description?.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '') : ''}
        openGraph={{

          type: 'website',
          url: `${serverRuntimeConfig?.HOST_FRONT ?? runtimeConfig?.HOST_FRONT}/job/${props.job.id}`,
          title: props.job.name,
          description: props.job.intro.visible ? props.job.intro.description : '',
          images: [
            {
              url: `${serverRuntimeConfig?.HOST_FRONT ?? runtimeConfig?.HOST_FRONT}/api/share-image/job/${props.job.id}`,
              width: 540,
              height: 450,
              alt: props.job.name,
            },
          ],
        }}
      />
      <JobPostingJsonLd datePosted={format(new Date(props.job.publishedAt ?? props.job.createdAt!), 'yyyy-MM-dd')}
                        description={props.job.intro.visible ? props.job.intro.description : ''}
                        hiringOrganization={{
                          name: props.job.company?.name as string,
                          sameAs: props.job.company?.name as string,
                          ...(props.job.company.logo ? {logo: ImageHelper.urlFromSource(props.job.company.logo.source!)} : {})
                        }}
                        title={props.job.name}
                        employmentType={getEmploymentJsonLd(props.job)}
                        jobLocation={{
                          addressLocality: props.job.office?.city?.fcode as string,
                          postalCode: props.job.office?.postalCode  as string,
                          streetAddress: [props.job.office?.house , props.job.office?.street].filter(i => !!i).join(' ') as string,
                          addressCountry: props.job.office?.country?.fcode  as string
                        }}
                        baseSalary={{
                          currency: props.job.currency,
                          value: props.job.salaryMin && props.job.salaryMax ? [props.job.salaryMin!, props.job.salaryMax!] as [number, number] : (props.job.salaryMax || props.job.salaryMin || 0) as number,
                          unitText:getSalaryUnitJsonLd(props.job) }}
      />
      <div className={styles.root}>
        <div ref={ref} className={styles.container} id='idVacancyContainer'>
          <JobPreview job={props.job} company={props.job.company}/>
          {isClient && !isSmDesktopWidth && canShowContent && sideBarType !== SideBarType.Apply && !hasApplication && !(request && request.vacancyId === props.job.id) &&
            <FormStickyFooter boundaryElement={'#idVacancyContainer'} formRef={ref} className={styles.footer}>
              <Button spinner={false} type='submit' styleType='large' color='green'
                      onClick={() => openApplicationModal()}>
                {t('job_preview_button_apply')}
              </Button>
            </FormStickyFooter>}
        </div>
        {isClient && isSmDesktopWidth && !canShowContent && <ContentLoader isOpen={true} style={'block'}/>}
        {canShowContent && isTabletWidth &&
          <Button color='green' onClick={openApplyModal} font='normal16' styleType='large'
                  className={styles.applyButton}>Apply</Button>
        }
        {isClient && !isSmDesktopWidth && canShowContent && sideBarType === SideBarType.Apply &&
          <ApplyForJobForm vacancyId={props.job.id}/>
        }
        {isClient && !isSmDesktopWidth && canShowContent && sideBarType === SideBarType.Calendar && <MyEvents/>}
        {isClient && !isSmDesktopWidth && canShowContent && sideBarType === SideBarType.Chat &&
          <ChatOnPage simpleType vacancyId={props.job.id}
                      cvId={newApplication?.cvId ?? props.job.applicationByCurrentUser?.cvId ?? props.job.proposalToCurrentUser?.cvId}/>
        }
      </div>
    </Layout>
  )
}
const JobPage = (props: Props) => {
  useEffect(() => {
    EntityViewRepository.track(EntityViewType.Vacancy,props.job.id)
  }, [])
  return (<JobPageInner {...props}/>)
}

export default JobPage
export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const id = parseInt(context.query.id as string, 10)
  const token = context.req.cookies[CookiesType.accessToken]

  try {
    const job = await VacancyRepository.fetchById(id, token)
    return {
      props: {
        job
      }
    }
  } catch (e) {
    console.error(e)
    if (e instanceof RequestError) {
      if (e.isNotFoundError) {
        return {
          notFound: true
        }
      }
    }
    throw e
  }

}
