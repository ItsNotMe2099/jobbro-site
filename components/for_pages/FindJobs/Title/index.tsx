import styles from 'components/for_pages/FindJobs/Title/index.module.scss'
import Link from 'next/link'

interface Props {
  title: string
  text: string
  link?: string
  hideLink?: boolean
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
      {props.link && !props.hideLink &&
      <Link href={'#'} className={styles.link}>
        Show more
      </Link>
      }
    </div>
  )
}
