import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import Link from 'next/link'
import Item from './Item'


interface Props {
  data: any[]
}

export default function HiringStage(props: Props) {

  return (
    <Card title={<div className={styles.top}>
      <div className={styles.title}>Hiring Stage Conversion</div>
      <Link className={styles.more} href={'#'}>Show all</Link>
    </div>} className={styles.root}>
      <div className={styles.position}>
        Senior Manager of Software Development and Engineering
      </div>
      <div className={styles.items}>
        {props.data.map((i, index) =>
          <Item label={i.label} percent={i.percent} secondPerc={i.secondPerc} total={i.total} key={index} />
        )}
      </div>
    </Card>
  )
}
