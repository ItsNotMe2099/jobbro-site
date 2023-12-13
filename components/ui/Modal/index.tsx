import styles from './index.module.scss'
import classNames from 'classnames'
import ReactModal from 'react-modal'
import {ReactElement} from 'react'
import {useAppContext} from '@/context/state'
import * as React from 'react'


export interface IModalProps {
  isOpen?: boolean
  onRequestClose?: () => void
  className?: string
  overlayClassName?: string
}
interface Props extends IModalProps{
  children?: ReactElement | ReactElement[] | null | boolean
}
export default function Modal(props: Props) {
  const appContext = useAppContext()
  return (
    <ReactModal isOpen={props.isOpen ?? false} onRequestClose={() => props.onRequestClose?.()}
                className={styles.root}
                overlayClassName={classNames([styles.overlay, appContext.modal && styles[appContext.modal]])}
    >
      {props.children}
    </ReactModal>
  )
}
