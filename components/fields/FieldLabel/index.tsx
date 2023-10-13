import styles from './index.module.scss'
import classNames from 'classnames'

export interface Props{
 label: string
 focused: boolean
}

export default function FieldLabel(props: Props) {

  return (
    <label className={classNames(styles.root, {[styles.focused]: props.focused})}>
      {props.label}
    </label>
  )
}

