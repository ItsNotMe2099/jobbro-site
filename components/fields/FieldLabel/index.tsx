import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
export type LabelStyleType = 'dynamic' | 'large'
export interface Props {
  label: string | ReactElement
  focused?: boolean
  className?: string
  focusedClassName?: string
  static?: boolean
  styleType?: 'dynamic' | 'large' | undefined
}

export default function FieldLabel(props: Props) {

  return (
    <label className={classNames(styles.root, {[styles.focused]: props.focused, [styles.dynamic]: !props.styleType || props.styleType === 'dynamic', [styles.large]: props.styleType === 'large', ...(props.focusedClassName ? {[props.focusedClassName]: props.focused} : {})}, props.className)}>
      {props.label}
    </label>
  )
}

