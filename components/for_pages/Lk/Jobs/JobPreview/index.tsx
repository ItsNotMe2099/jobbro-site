import styles from './index.module.scss'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {ICompany} from '@/data/interfaces/ICompany'
import {Nullable} from '@/types/types'
import JobDetailsPreview from '@/components/for_pages/Lk/Jobs/JobDetailsPreview'
import JobCompanyPreview from '@/components/for_pages/Lk/Jobs/JobCompanyPreview'
import { useAppContext } from '@/context/state'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { useRouter } from 'next/navigation'

interface Props {
  job: IVacancy,
  company: Nullable<ICompany>
}

export default function JobPreview(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  return (<div className={styles.root}>
      <PageTitle title={props.job.name} onBack={router.back}/>
      {props.company && <JobCompanyPreview company={props.company}/>}
      <JobDetailsPreview job={props.job}/>
    </div>
  )
}
