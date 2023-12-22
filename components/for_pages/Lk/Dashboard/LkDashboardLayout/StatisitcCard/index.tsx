import PolygonSvg from '@/components/svg/PolygonSvg'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import Link from 'next/link'
import {IDashboardStatistic} from '@/data/interfaces/IDashboardResponse'
import useTranslation from 'next-translate/useTranslation'


interface Props {
  statistic: IDashboardStatistic
}

export default function StatisticCard(props: Props) {
  const {statistic} = props
  const { t } = useTranslation()
  const options = [
   // { label: 'Candidate Satisfaction Index',  },
   // { label: 'Customer Satisfaction Index' },
    { label: t('dashboard_average_response_time'), value: statistic.averageResponseTime.average_response_time_in_week, up: statistic.averageResponseTime.average_response_time_in_week >= statistic.averageResponseTime.average_response_time_in_prev_week  },
    { label: t('dashboard_average_recruitment_rate'),  value: statistic.recruitmentRate.recruitment_rate_in_week, up: statistic.recruitmentRate.recruitment_rate_in_week >= statistic.recruitmentRate.recruitment_rate_in_prev_week   },
    { label: t('dashboard_average_success_rate'), value: statistic.successRate.success_rate_in_week, up: statistic.successRate.success_rate_in_week >= statistic.successRate.success_rate_in_prev_week },
  ]

  return (
    <Card title={t('dashboard_statistic')} className={styles.root}>
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
        {t('dashboard_view_more')}
      </Link>
    </Card>
  )
}
