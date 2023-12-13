import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import {useAppContext} from 'context/state'

interface Props {
  fixed?: boolean
  children?: ReactElement | ReactElement[]
  id?: string
  className?: string
}

export default function ModalBody(props: Props) {
  const context = useAppContext()
  return (
    <div className={classNames(styles.root, {[styles.fixed]: props.fixed || context.isMobile}, props.className)}>
      <div className={classNames(styles.wrapper, {[styles.fixed]: props.fixed || context.isMobile}, props.className)} id={props.id}>
        {props.children}
      </div>
    </div>
    )
}
