import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import Link from 'next/link'
import DropdownMenu from '@/components/ui/DropdownMenu'
import { Routes } from '@/types/routes'

interface Props {
  item: any
}

export const ResumeCard = ({ item }: Props) => {

  const options = [
    { label: 'Edit', href: Routes.profileResumeEdit(item.id) },
    { label: 'Duplicate' },
    { label: 'Hide for hiring' },
    { label: 'Download in PDF' },
    { label: 'Delete' },
  ]

  return (
    <div className={styles.root}>
      <Card>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={styles.title}>{item.name}</div>
            <DropdownMenu options={options} />
          </div>
          <div className={styles.updated}>
            Update: {item.updated}
          </div>
          <div className={styles.stats}>
            <div className={styles.item}>
              {item.stats.jobs} jobs
            </div>
            <div className={styles.item}>
              {item.stats.impressions} impressions
            </div>
            <div className={styles.item}>
              {item.stats.invites} invites
            </div>
            <div className={styles.item}>
              {item.stats.views} views
            </div>
          </div>
          <Link className={styles.show} href={''}>
            Show jobs
          </Link>
        </div>
      </Card>
    </div>
  )
}