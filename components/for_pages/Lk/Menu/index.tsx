import { Routes } from '@/types/routes'
import styles from './index.module.scss'
import { ReactElement } from 'react'
import Link from 'next/link'
import ArrowsSvg from '@/components/svg/ArrowsSvg'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Menu(props: Props) {

  const router = useRouter()

  const menu = [
    { label: 'Dashboard', link: Routes.lkDashboard },
    { label: 'Jobs', link: Routes.lkJobs },
    { label: 'Candidates base', link: Routes.lkCandidateBase },
    { label: 'Hiring Boards', link: Routes.lkHiringBoards },
    { label: 'Your Company', link: Routes.lkYourCompany },
    { label: 'Scorecards Templates', link: Routes.lkScorecardsTemplates },
    { label: 'Settings', link: Routes.lkSettings },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.first}>
        <div className={styles.top}>
          <div className={styles.title}>
            Actions
          </div>
          <ArrowsSvg className={styles.arrows} />
        </div>
        <div className={styles.menu}>
          {menu.map((i, index) =>
            <Link className={classNames(styles.item, { [styles.active]: router.asPath === i.link })} href={i.link} key={index}>
              {router.asPath === i.link && <div className={styles.line} />}
              {i.label}
            </Link>
          )}
        </div>
      </div>
      <Button className={styles.btn} styleType='large' color='green'>
        New Job
      </Button>
    </div>
  )
}
