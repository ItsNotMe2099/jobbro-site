import styles from './index.module.scss'
import {ReactElement} from 'react'
import classNames from 'classnames'


interface Props {
children: ReactElement[] | ReactElement
  className?: string
}

export default function ChipList(props: Props) {
  return (<div className={classNames(styles.root, props.className)}>{props.children}</div>)
}

