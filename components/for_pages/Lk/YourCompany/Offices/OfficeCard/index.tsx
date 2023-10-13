import PersonSvg from '@/components/svg/PersonSvg'
import styles from 'components/for_pages/Lk/YourCompany/Offices/OfficeCard/index.module.scss'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import MenuSvg from '@/components/svg/MenuSvg'
import {IOffice} from '@/data/interfaces/IOffice'

interface Props {
  office: IOffice
  className?: string
}

export default function OfficeCard(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.jobs}>
            0 job
          </div>
          <div className={styles.employees}>
            <PersonSvg color={colors.textSecondary} />
            <div className={styles.quantity}>
             0
            </div>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.country}>
            {props.office.name}
          </div>
          <div className={styles.city}>
            {props.office.city?.name}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.status}>
            Default
          </div>
          <MenuSvg className={styles.menu} color={colors.textPrimary} />
        </div>
      </div>
    </div>
  )
}
