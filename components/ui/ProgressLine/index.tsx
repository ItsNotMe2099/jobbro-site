import styles from './index.module.scss'

interface Props {
  percents: number
}

export default function ProgressLine(props: Props) {

  return (<div className={styles.root}> 
    <div className={styles.line} style={{width: `${props.percents}%`}}></div>

  </div>)
}