import styles from './index.module.scss'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {ICompany} from '@/data/interfaces/ICompany'
import {Nullable} from '@/types/types'
import JobDetailsPreview from '@/components/for_pages/Lk/Jobs/JobDetailsPreview'
import JobCompanyPreview from '@/components/for_pages/Lk/Jobs/JobCompanyPreview'
import { useAppContext } from '@/context/state'

interface Props {
  job: IVacancy,
  company: Nullable<ICompany>
}

export default function JobPreview(props: Props) {
  const appContext = useAppContext()
  return (<div className={styles.root}>
      {props.company && <JobCompanyPreview company={props.company}/>}
      <JobDetailsPreview job={props.job}/>
    </div>
  )
}
