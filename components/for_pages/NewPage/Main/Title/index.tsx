import styles from './index.module.scss'
import Link from 'next/link'

interface Props {
  title: string
  text: string
}

export default function Title(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.title}>
          {props.title}
        </div>
        <div className={styles.text}>
          {props.text}
        </div>
      </div>
      <Link href={'#'} className={styles.link}>
        Show more
      </Link>
    </div>
  )
}
