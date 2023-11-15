import styles from './index.module.scss'
import {useRouter} from 'next/router'
import VacancyOwnerRepository from '@/data/repositories/VacancyOwnerRepository'
import {IVacancy} from '@/data/interfaces/IVacancy'
import JobPreview from '@/components/for_pages/Lk/Jobs/JobPreview'
import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next/types'
import {CookiesType, ModalType} from '@/types/enums'
import Layout from '@/components/layout/Layout'
import FormStickyFooter from '@/components/for_pages/Common/FormStickyFooter'
import Button from '@/components/ui/Button'
import {useRef} from 'react'
import {useAppContext} from '@/context/state'
import {ApplicationCreateModalArguments} from '@/types/modal_arguments'

interface Props{
  job: IVacancy
}
const JobPageInner = (props: Props) => {
  const appContext = useAppContext()
  const ref = useRef<HTMLDivElement | null>(null)
  return ( <Layout>
        <div ref={ref} className={styles.root}>
          <JobPreview job={props.job} company={props.job.company} />
          <FormStickyFooter boundaryElement={`.${styles.root}`} formRef={ref}>
            <Button spinner={false} type='submit' styleType='large' color='green' onClick={() => appContext.showModal(ModalType.ApplicationCreate, {vacancyId: props.job?.id} as ApplicationCreateModalArguments)}>
              Apply
            </Button>
          </FormStickyFooter>
        </div>
</Layout>
  )
}
const JobPage = (props: Props) => {
  const router = useRouter()
  return (<JobPageInner {...props}/>)
}

export default  JobPage
export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const id = parseInt(context.query.id as string, 10)
  const token = context.req.cookies[CookiesType.accessToken]
  const job = await VacancyOwnerRepository.fetchById(id, token)
  console.log('job', job)
  return {
    props: {
      job
    }
  }
}
