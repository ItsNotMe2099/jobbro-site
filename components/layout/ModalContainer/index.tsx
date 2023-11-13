import { useAppContext } from 'context/state'
import { RemoveScroll } from 'react-remove-scroll'
import { ModalType } from '@/types/enums'
import {ConfirmModal} from '@/components/modals/ConfirmModal'
import Modal, {IModalProps} from '@/components/ui/Modal'
import ApplicationCreateModal from '@/components/modals/ApplicationCreateModal'

interface Props { }

export default function ModalContainer(props: Props) {
  const appContext = useAppContext()
  const commonSettings: IModalProps = {
    onRequestClose: appContext.hideModal,
  }

  console.log('ShowModal', appContext.modal, ModalType.ApplicationCreate  )
  return (
    <RemoveScroll enabled={!!appContext.modal}>
      <div aria-hidden="true">
        <Modal isOpen={appContext.modal === ModalType.Confirm} {...commonSettings}>
          {appContext.modal === ModalType.Confirm && <ConfirmModal isBottomSheet={false} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.ApplicationCreate} {...commonSettings}>
          {appContext.modal === ModalType.ApplicationCreate && <ApplicationCreateModal isBottomSheet={false} />}
        </Modal>
      </div>
    </RemoveScroll>
  )
}
