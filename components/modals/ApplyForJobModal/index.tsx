import ModalLayout from '@/components/layout/Modal/ModalLayout'
import styles from './index.module.scss'
import ModalBody from '@/components/layout/Modal/ModalBody'
import {useAppContext} from '@/context/state'
import ApplyForJobForm from '@/components/for_pages/Common/ApplyForJobForm'

interface Props {
  isBottomSheet: boolean
}

export interface IApplyForJobModal {
  vacancyId: number
}

export default function ApplyForJobModal(props: Props) {
  const appContext = useAppContext()
  const args: IApplyForJobModal = appContext.modalArguments
  


  if (props.isBottomSheet) {
    return        (<ApplyForJobForm vacancyId={args.vacancyId} isBottomSheet={props.isBottomSheet} />)
  }
  return (<ModalLayout mobileFullScreen>
    <ModalBody className={styles.modalBody}>
      <div className={styles.root}>
        <ApplyForJobForm vacancyId={args.vacancyId} />
      </div>
    </ModalBody>
  </ModalLayout>)
}
