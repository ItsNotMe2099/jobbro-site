import styles from './index.module.scss'


interface Props {
children: string
}

export default function Chip(props: Props) {
  return (<div className={styles.root}>{props.children}</div>)
}

