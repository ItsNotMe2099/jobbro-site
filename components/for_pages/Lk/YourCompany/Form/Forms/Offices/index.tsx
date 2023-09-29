import AddOfficeSvg from '@/components/svg/AddOfficeSvg'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import { Routes } from '@/types/routes'
import OfficeCard from './OfficeCard'
import classNames from 'classnames'

interface Props {

}

export default function Offices(props: Props) {

  const data: any[] = [
    { jobs: 1, employees: 86, country: 'Indonesia', city: 'Jakarta', status: 'default' },
    { jobs: 1, employees: 86, country: 'Indonesia', city: 'Jakarta', status: 'default' },
    { jobs: 1, employees: 86, country: 'Indonesia', city: 'Jakarta', status: 'default' },
    { jobs: 1, employees: 86, country: 'Indonesia', city: 'Jakarta', status: 'default' },
    { jobs: 1, employees: 86, country: 'Indonesia', city: 'Jakarta', status: 'default' },
    { jobs: 1, employees: 86, country: 'Indonesia', city: 'Jakarta', status: 'default' },
  ]

  return (
    <div className={classNames(styles.root, {[styles.cards]: data.length > 0})}>
      {!data.length ? <div className={styles.add}>
        <AddOfficeSvg />
        <div className={styles.right}>
          <div className={styles.title}>
            Failed find any office
          </div>
          <div className={styles.desc}>
            Every job for publication requires at least the one office<br /> to be added on Jobbro. You can add
            more details so that<br /> candidates find your jobs more easily. Contact us if you<br />
            have issues creating an office.
          </div>
          <Button href={Routes.lkYourCompanyEdit} className={styles.btn} styleType='large' color='green'>
            Add office
          </Button>
        </div>
      </div>
        :
        <div className={styles.offices}>
          {data.map((i, index) =>
            <OfficeCard className={styles.office} key={index} item={i} />
          )}
        </div>}
    </div>
  )
}
