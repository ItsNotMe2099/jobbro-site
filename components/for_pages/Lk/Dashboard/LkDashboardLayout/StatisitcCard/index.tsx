import PolygonSvg from '@/components/svg/PolygonSvg'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import Link from 'next/link'


interface Props {
  data: any[]
}

export default function StatisticCard(props: Props) {

  const labels = [
    { label: 'Candidate Satisfaction Index' },
    { label: 'Customer Satisfaction Index' },
    { label: 'Average response time, hour' },
    { label: 'Recruitment rate, hour' },
    { label: 'Success rate, %' },
  ]
  
  return (
    <Card title={'Statistic'} className={styles.root}>
      <div className={styles.separator} />
      <div className={styles.wrapper}>
        {props.data.map((i, index) =>
          <div className={styles.item} key={index}>
            <div className={styles.left}>
              {labels[index].label}
            </div>
            <div className={styles.right}>
              <div className={styles.val}>
                {i.val}
              </div>
              <PolygonSvg color={i.up ? colors.green : colors.red} className={classNames({ [styles.revert]: !i.up })} />
            </div>
          </div>
        )}
      </div>
      <Link className={styles.more} href={'#'}>
        View more
      </Link>
    </Card>
  )
}
