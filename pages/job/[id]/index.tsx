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
import ApplyForJobCard from '@/components/for_pages/Common/ApplyForJobCard'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  job: IVacancy
}

const JobPageInner = (props: Props) => {
  const appContext = useAppContext()
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement | null>(null)
  return (<Layout>
      <div className={styles.root}>
        <div ref={ref} className={styles.container}>
          <JobPreview job={props.job} company={props.job.company}/>
          <FormStickyFooter boundaryElement={`.${styles.container}`} formRef={ref}>
            <Button spinner={false} type='submit' styleType='large' color='green'
                    onClick={() => appContext.showModal(ModalType.ApplicationCreate, {vacancyId: props.job?.id} as ApplicationCreateModalArguments)}>
              {t('job_preview_button_apply')}
            </Button>
          </FormStickyFooter>
        </div>
        <ApplyForJobCard vacancyId={props.job.id}/>
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
  const job = await VacancyOwnerRepository.fetchById(id, token)
  return {
    props: {
      job
    }
  }
}
