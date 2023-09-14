import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'

interface Props {
  showError?: boolean,
  className?: string  | null
  children?: ReactElement | string | undefined
}

export default function FieldError(props: Props) {
  const { showError } = props
  if(showError) {
    return (<div className={classNames(styles.root, props.className)}>{props.children}</div>)
  }else{
    return (<></>)
  }
}
