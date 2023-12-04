import styles from './index.module.scss'
import classNames from 'classnames'


interface Props {
children: string
  className?: string
}

export default function Chip(props: Props) {
  return (<div className={classNames(styles.root, props.className)}>{props.children}</div>)
}

