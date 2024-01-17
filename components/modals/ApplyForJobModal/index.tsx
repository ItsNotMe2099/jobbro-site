import ModalLayout from '@/components/layout/Modal/ModalLayout'
// import styles from './index.module.scss'
import ModalBody from '@/components/layout/Modal/ModalBody'
import ApplyForJobCard from '@/components/for_pages/Common/ApplyForJobCard'
import { useAppContext } from '@/context/state'

interface Props {
  onClose: () => void
  isBottomSheet: boolean
}

export interface IApplyForJobModal {
  vacancyId: number
}

export default function ApplyForJobModal(props: Props) {
  const appContext = useAppContext()
  const args: IApplyForJobModal = appContext.modalArguments

  return (<ModalLayout mobileFullScreen>
    <ModalBody>
      <ApplyForJobCard vacancyId={args.vacancyId}/>
    </ModalBody>
  </ModalLayout>)
}