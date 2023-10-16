import { colors } from '@/styles/variables'
import styles from './index.module.scss'
import LocationSvg from '@/components/svg/LocationSvg'
import Company from '../Company'

interface Props {
  period: any //temp
  item: any
}

export default function Period(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.period}>
        <div className={styles.dates}>{props.period.dates}</div>
        <div className={styles.full}>{props.item.experience}</div>
      </div>
      <div className={styles.info}>
      {props.period.company && <Company company={props.period.company} />}
        <div className={styles.top}>
          <div className={styles.position}>{props.period.position}</div>
          <div className={styles.country}>
            <LocationSvg color={colors.textSecondary} />
            <div>{props.period.country}</div>
          </div>
        </div>
        <div className={styles.about}>
          {props.period.about}
        </div>
        <ul className={styles.list}>
          {props.period.skills.map((i: any, index: number) =>
            <li key={index}>{i.text}</li>
          )}
        </ul>
      </div>
    </div>
  )
}
