import styles from './index.module.scss'
import {LkPageLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {useRouter} from 'next/router'
import VacancyOwnerRepository from '@/data/repositories/VacancyOwnerRepository'
import {IVacancy} from '@/data/interfaces/IVacancy'
import JobPreview from '@/components/for_pages/Lk/Jobs/JobPreview'
import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next/types'

interface Props{
  job: IVacancy
}
const JobEditPageInner = (props: Props) => {

  return (
        <div className={styles.root}>
          <JobPreview job={props.job} />
        </div>
  )
}
const JobEditPage = (props: Props) => {
  const router = useRouter()
  return (<JobEditPageInner/>)
}
JobEditPage.getLayout = LkPageLayout
export default  JobEditPage
export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const id = parseInt(context.query.id as string, 10)
  const job = await VacancyOwnerRepository.fetchById(id)
  console.log('job', job)
  return {
    props: {
      job
    }
  }
}
