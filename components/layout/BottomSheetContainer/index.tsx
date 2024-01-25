import styles from './index.module.scss'
import Sheet from 'react-modal-sheet'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import { RemoveScroll } from 'react-remove-scroll'
import ApplicationCreateModal from '@/components/modals/ApplicationCreateModal'
import CropAvatarModal from '@/components/modals/CropAvatar/CropAvatarModal'
import ApplyForJobModal from '@/components/modals/ApplyForJobModal'
import JobChatModal from '@/components/modals/JobChatModal'
import MyEventsModal from '@/components/modals/MyEventsModal'

interface Props { }

export default function BottomSheetContainer(props: Props) {
  const appContext = useAppContext()
  const handleClose = () => {
    if(appContext.bottomSheetOnTop){
      appContext.hideBottomSheetOnTop()
    }else {
      appContext.hideBottomSheet()
    }
  }
  return (
    <RemoveScroll enabled={!!appContext.bottomSheet}>
      <div className={styles.root} aria-hidden="true">
        <Sheet
          isOpen={appContext.bottomSheet == ModalType.ApplicationCreate}
          onClose={handleClose}
          snapPoints={[400]}
          disableDrag={appContext.modalNonSkippable}
        >
          <ApplicationCreateModal isBottomSheet={true} />
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet == ModalType.ApplyForJobModal}
          onClose={handleClose}
          snapPoints={[650]}
          disableDrag={appContext.modalNonSkippable}
        >
          <ApplyForJobModal isBottomSheet={true} />
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheetOnTop == ModalType.CropAvatarModal}
          onClose={handleClose}
          snapPoints={[700]}
        >
          <CropAvatarModal isBottomSheet={true} />
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet == ModalType.JobChatModal}
          onClose={handleClose}
          snapPoints={[700]}
        >
          <JobChatModal isBottomSheet={true} />
        </Sheet>
        <Sheet
          isOpen={appContext.bottomSheet == ModalType.MyEventsModal}
          onClose={handleClose}
          snapPoints={[700]}
        >
          <MyEventsModal isBottomSheet={true} />
        </Sheet>
      </div>
    </RemoveScroll>
  )
}

