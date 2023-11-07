import styles from './index.module.scss'
import Company from '../Company'
import {ExperienceInfo} from '@/data/interfaces/Common'
import Formatter from '@/utils/formatter'
import VacancyUtils from '@/utils/VacancyUtils'

interface Props {
  experienceItem: ExperienceInfo
}

export default function Period(props: Props) {
  const {experienceItem} = props
  return (
    <div className={styles.root}>
      <div className={styles.period}>
        <div className={styles.dates}>{Formatter.formatRangeMonthYear(experienceItem)}</div>
        <div className={styles.full}>{VacancyUtils.formatRangeMonthYearToDuration(experienceItem)}</div>
      </div>
      <div className={styles.info}>
      {experienceItem.company && <Company companyName={experienceItem.company} />}
        <div className={styles.top}>
          <div className={styles.position}>{experienceItem.position}</div>
          {/*<div className={styles.country}>
            <LocationSvg color={colors.textSecondary} />
            <div>{props.period.country}</div>
          </div>*/}
        </div>
        <div className={styles.about}>
          {experienceItem.description}
        </div>
      </div>
    </div>
  )
}
