import styles from './index.module.scss'
import {ReactElement} from 'react'
import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
  title?: string
  suffix?: ReactElement
  className?: string
}

export default function BottomSheetHeader(props: Props) {
  return (
    <div className={classNames(styles.root, {[styles.withSuffix]: !!props.suffix}, props.className)}>
      {props.children && props.children}
      {!props.children && props.title && <><div className={styles.title}>{props.title}</div>
      {props.suffix && <div className={styles.suffix}>{props.suffix}</div>}
      </>}
    </div>
  )
}
