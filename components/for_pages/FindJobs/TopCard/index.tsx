import styles from 'components/for_pages/FindJobs/TopCard/index.module.scss'

import Card from '@/components/for_pages/Common/Card'
import Link from 'next/link'
import { ReactElement } from 'react'

interface Props {
  link: string
  linkLabel: string
  icon: ReactElement
  text: string | ReactElement
}

export default function TopCard(props: Props) {

  return (
    <Card className={styles.root}>
      <div className={styles.top}>
        <div className={styles.icon}>
          {props.icon}
        </div>
        <div className={styles.text}>
          {props.text}
        </div>
      </div>
      <Link href={props.link} className={styles.link}>
        {props.linkLabel}
      </Link>
    </Card>
  )
}
