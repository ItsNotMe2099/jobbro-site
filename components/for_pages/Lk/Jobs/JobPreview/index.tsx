import styles from './index.module.scss'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {ICompany} from '@/data/interfaces/ICompany'
import {Nullable} from '@/types/types'
import JobDetailsPreview from '@/components/for_pages/Lk/Jobs/JobDetailsPreview'
import JobCompanyPreview from '@/components/for_pages/Lk/Jobs/JobCompanyPreview'
import { useAppContext } from '@/context/state'
import Button from '@/components/ui/Button'
import { ModalType } from '@/types/enums'
import { IApplyForJobModal } from '@/components/modals/ApplyForJobModal'

interface Props {
  job: IVacancy,
  company: Nullable<ICompany>
}

export default function JobPreview(props: Props) {
  const appContext = useAppContext()
  const {isTabletWidth } = appContext.size

  const openApplyModal = () => {
    appContext.showModal<IApplyForJobModal>(ModalType.ApplyForJobModal, {vacancyId: props.job.id})
  }


  return (<div className={styles.root}>
      {props.company && <JobCompanyPreview company={props.company}/>}
      <JobDetailsPreview job={props.job}/>
      {isTabletWidth &&
        <Button color='green' onClick={openApplyModal} font='normal16' styleType='large' className={styles.applyButton}>Apply</Button>
       }
    </div>
  )
}
