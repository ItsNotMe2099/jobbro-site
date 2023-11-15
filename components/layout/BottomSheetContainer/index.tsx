import styles from './index.module.scss'
import Sheet from 'react-modal-sheet'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import { RemoveScroll } from 'react-remove-scroll'
import ApplicationCreateModal from '@/components/modals/ApplicationCreateModal'

interface Props { }

export default function BottomSheetContainer(props: Props) {
  const appContext = useAppContext()
  return (
    <RemoveScroll enabled={!!appContext.bottomSheet}>
      <div className={styles.root} aria-hidden="true">
        <Sheet
          isOpen={appContext.bottomSheet == ModalType.ApplicationCreate}
          onClose={appContext.hideBottomSheet}
          snapPoints={[400]}
          disableDrag={appContext.modalNonSkippable}
        >
          <ApplicationCreateModal isBottomSheet={true} />
        </Sheet>
      </div>
    </RemoveScroll>
  )
}
