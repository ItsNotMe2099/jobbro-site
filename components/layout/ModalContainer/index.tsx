import { useAppContext } from 'context/state'
import { RemoveScroll } from 'react-remove-scroll'
import { ModalType } from '@/types/enums'
import {ConfirmModal} from '@/components/modals/ConfirmModal'
import Modal, {IModalProps} from '@/components/ui/Modal'
import ApplicationCreateModal from '@/components/modals/ApplicationCreateModal'
import CropAvatarModal from '@/components/modals/CropAvatar/CropAvatarModal'
import SearchFiltersModal from '@/components/modals/SearchFiltersModal'
import GalleryModal from '@/components/modals/GalleryModal'
import JobChatModal from '@/components/modals/JobChatModal'
import ChooseSlotModal from '@/components/modals/ChooseSlotModal'

interface Props { }

export default function ModalContainer(props: Props) {
  const appContext = useAppContext()
  const commonSettings: IModalProps = {
    onRequestClose: appContext.hideModal,
  }

  return (
    <RemoveScroll enabled={!!appContext.modal}>
      <div aria-hidden="true">
        <Modal isOpen={appContext.modal === ModalType.Confirm} {...commonSettings}>
          {appContext.modal === ModalType.Confirm && <ConfirmModal isBottomSheet={false} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.ApplicationCreate} {...commonSettings}>
          {appContext.modal === ModalType.ApplicationCreate && <ApplicationCreateModal isBottomSheet={false} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.CropAvatarModal} {...commonSettings}>
          {appContext.modal === ModalType.CropAvatarModal && <CropAvatarModal onClose={appContext.hideModal} isBottomSheet={false} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.SearchFiltersModal} {...commonSettings}>
          {appContext.modal === ModalType.SearchFiltersModal && <SearchFiltersModal onClose={appContext.hideModal}/>}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.Gallery} {...commonSettings}>
          {appContext.modal === ModalType.Gallery && <GalleryModal onClose={appContext.hideModal}/>}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.JobChatModal} {...commonSettings}>
          {appContext.modal === ModalType.JobChatModal && <JobChatModal onClose={appContext.hideModal} isBottomSheet={false}/>}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.ChooseSlotModal} {...commonSettings}>
          {appContext.modal === ModalType.ChooseSlotModal && <ChooseSlotModal onClose={appContext.hideModal} isBottomSheet={false}/>}
        </Modal>
      </div>
    </RemoveScroll>
  )
}
