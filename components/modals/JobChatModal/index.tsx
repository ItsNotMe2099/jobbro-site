import ModalLayout from '@/components/layout/Modal/ModalLayout'
import styles from './index.module.scss'
import ModalBody from '@/components/layout/Modal/ModalBody'
import {useAppContext} from '@/context/state'
import ChatDialogWidget from '@/components/for_pages/Chat/ChatDialogWidget'
import {Nullable} from '@/types/types'

interface Props {
  isBottomSheet: boolean
}

export interface IJobChatModal {
  vacancyId?: Nullable<number | undefined>
  cvId?: Nullable<number | undefined>
  title?: string | undefined
}

export default function JobChatModal(props: Props) {
  const appContext = useAppContext()
  const args: IJobChatModal = appContext.modalArguments

  return (<ModalLayout mobileFullScreen>
    <ModalBody className={styles.modalBody}>
      <div className={styles.root}>
        <ChatDialogWidget vacancyId={args.vacancyId} cvId={args.cvId} title={args.title}/>
      </div>
    </ModalBody>
  </ModalLayout>)
}