import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  showError?: boolean,
  className?: string | null
  children?: ReactElement | string | undefined
}

export default function FieldError(props: Props) {
  const {showError} = props
  const {t} = useTranslation()
  if (showError) {
    return (<div
      className={classNames(styles.root, props.className)}>{typeof props.children === 'string' ? t(props.children) : props.children}</div>)
  } else {
    return (<></>)
  }
}
