import PolygonSvg from '@/components/svg/PolygonSvg'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import Link from 'next/link'
import {IDashboardStatistic} from '@/data/interfaces/IDashboardResponse'


interface Props {
  statistic: IDashboardStatistic
}

export default function StatisticCard(props: Props) {
  const {statistic} = props
  const options = [
   // { label: 'Candidate Satisfaction Index',  },
   // { label: 'Customer Satisfaction Index' },
    { label: 'Average response time, hour', value: statistic.averageResponseTime.average_response_time_in_week, up: statistic.averageResponseTime.average_response_time_in_week >= statistic.averageResponseTime.average_response_time_in_prev_week  },
    { label: 'Recruitment rate, hour',  value: statistic.recruitmentRate.recruitment_rate_in_week, up: statistic.recruitmentRate.recruitment_rate_in_week >= statistic.recruitmentRate.recruitment_rate_in_prev_week   },
    { label: 'Success rate, %', value: statistic.successRate.success_rate_in_week, up: statistic.successRate.success_rate_in_week >= statistic.successRate.success_rate_in_prev_week },
  ]

  return (
    <Card title={'Statistic'} className={styles.root}>
      <div className={styles.separator} />
      <div className={styles.wrapper}>
        {options.map((i, index) =>
          <div className={styles.item} key={index}>
            <div className={styles.left}>
              {i.label}
            </div>
            <div className={styles.right}>
              <div className={styles.val}>
                {i.value}
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
