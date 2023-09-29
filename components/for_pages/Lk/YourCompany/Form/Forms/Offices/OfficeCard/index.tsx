import PersonSvg from '@/components/svg/PersonSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import MenuSvg from '@/components/svg/MenuSvg'

interface Props {
  item: any //temp
  className?: string
}

export default function OfficeCard(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.jobs}>
            {props.item.jobs} job
          </div>
          <div className={styles.employees}>
            <PersonSvg color={colors.textSecondary} />
            <div className={styles.quantity}>
              {props.item.employees}
            </div>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.country}>
            {props.item.country}
          </div>
          <div className={styles.city}>
            {props.item.city}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.status}>
            {props.item.status}
          </div>
          <MenuSvg className={styles.menu} color={colors.textPrimary} />
        </div>
      </div>
    </div>
  )
}
