import { useAppContext } from '@/context/state'
import { RemoveScroll } from 'react-remove-scroll'

interface Props { }

export default function ModalContainer(props: Props) {
  const appContext = useAppContext()
  const commonSettings = {
    onRequestClose: appContext.hideModal,
  }
  return (
    <RemoveScroll enabled={!!appContext.modal}>
      <div aria-hidden="true">

      </div>
    </RemoveScroll>
  )
}
