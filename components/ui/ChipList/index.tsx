import styles from './index.module.scss'
import {ReactElement} from 'react'


interface Props {
children: ReactElement[] | ReactElement
}

export default function ChipList(props: Props) {
  return (<div className={styles.root}>{props.children}</div>)
}

