import { Routes } from '@/types/routes'
import styles from './index.module.scss'
import { ReactElement, useState } from 'react'
import Link from 'next/link'
import ArrowsSvg from '@/components/svg/ArrowsSvg'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'
import DocSvg from '@/components/svg/DocSvg'
import { colors } from '@/styles/variables'
import SparksSvg from '@/components/svg/SparksSvg'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Menu(props: Props) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

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

  const [showOptions, setShowOptions] = useState<boolean>(false)

  return (
    <div className={classNames(styles.root, {[styles.collapsed]: isCollapsed})}>

      <div className={styles.wrapper}>

      <div className={styles.first}>
        <div className={styles.top}>
          <div className={styles.title}>
            Actions
          </div>
          <div className={styles.arrows} onClick={() => setIsCollapsed(i => !i)}>
            <ArrowsSvg color={colors.simpleGrey}/>
          </div>

        </div>
        <div className={styles.menu}>
          {menu.map((i, index) =>
            <Link className={classNames(styles.item, { [styles.active]: router.asPath.includes(i.link) })} href={i.link} key={index}>
              {router.asPath.includes(i.link) && <div className={styles.line} />}
              {i.label}
            </Link>
          )}
        </div>
      </div>
      <div className={styles.btn}>
        {showOptions &&
          <div className={styles.options}>
            <Link href={Routes.lkJobsCreateJobManually} className={styles.option}>
              <DocSvg color={colors.green} />
              <div className={styles.desc}>
                <div className={styles.main}>
                  Create manually
                </div>
                <div className={styles.text}>
                  Filling out the vacancy form
                </div>
              </div>
            </Link>
            <Link href={'#'} className={styles.option}>
              <SparksSvg color={colors.green} />
              <div className={styles.desc}>
                <div className={styles.main}>
                  Create with AI
                </div>
                <div className={styles.text}>
                  Fast automatic generation
                </div>
              </div>
            </Link>
          </div>}
        <Button onClick={() => setShowOptions(!showOptions)} styleType='large' color='green'>
          New Job
        </Button>
      </div>
      </div>
    </div>
  )
}
