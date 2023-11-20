import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'

export interface Props {
  label: string | ReactElement
  focused: boolean
  className?: string
  focusedClassName?: string
}

export default function FieldLabel(props: Props) {

  return (
    <label className={classNames(styles.root, {[styles.focused]: props.focused, ...(props.focusedClassName ? {[props.focusedClassName]: props.focused} : {})}, props.className)}>
      {props.label}
    </label>
  )
}

