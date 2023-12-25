import styles from './index.module.scss'
import Button from 'components/ui/Button'
import {useAppContext} from 'context/state'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import ModalLayout from '@/components/layout/Modal/ModalLayout'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import ModalBody from '@/components/layout/Modal/ModalBody'
import ModalFooter from '@/components/layout/Modal/ModalFooter'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

interface Props{
  isBottomSheet?: boolean
}
export function ConfirmModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as ConfirmModalArguments
  const { t } = useTranslation()
  const handleCancel = () => {
    if(!args.onCancel){
      appContext.hideModal()
    }else{
      args.onCancel()
    }
  }
  const footer = (<div className={styles.buttons}>
    <Button styleType={'large'} color='transparent' fluid type="button" onClick={handleCancel}>
      {args.cancel || t('confirm_modal_button_cancel')}
    </Button>
    <Button  className={classNames(styles.confirmButton, {[styles[args.confirmColor ?? 'green']]: true})}  styleType={'large'} color='transparent' fluid type="button" onClick={args.onConfirm}>
      {args.confirm || t('confirm_modal_button_confirm')}
    </Button>
  </div>)
  const body = (<div className={styles.body}>
    {args.title && <div className={styles.title}>{args.title ?? ''}</div>}
    {args.text && <div className={styles.text}>{args.text ?? ''}</div>}
    </div>
  )


  return (
    <ModalLayout size={'small'}  >
      <ModalHeader className={styles.header}/>
      <ModalBody className={styles.modalBody}>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </ModalLayout>
  )

}
