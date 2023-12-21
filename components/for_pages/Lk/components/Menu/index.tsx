import {Routes} from '@/types/routes'
import styles from './index.module.scss'
import {ReactElement, useState} from 'react'
import Link from 'next/link'
import ArrowsSvg from '@/components/svg/ArrowsSvg'
import classNames from 'classnames'
import {useRouter} from 'next/router'
import Button from '@/components/ui/Button'
import {colors} from '@/styles/variables'
import MenuOptions from '@/components/for_pages/Common/MenuOptions'
import {useAppContext} from '@/context/state'
import {HirerRole} from '@/data/enum/HirerRole'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Menu(props: Props) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const appContext = useAppContext()
  const router = useRouter()

  const menu = [
    {label: 'Dashboard', link: Routes.lkDashboard},
    {label: 'Jobs', link: Routes.lkJobs},
    {label: 'Candidates base', link: Routes.lkCandidatesBase},
    {label: 'Hiring Boards', link: Routes.lkHiringBoards},
    {label: 'Your Company', link: Routes.lkCompany},
    //{ label: 'Scorecards Templates', link: Routes.lkScorecardsTemplates },
    ...(appContext.aboutMe?.hirerRole === HirerRole.Admin ? [{label: 'Settings', link: Routes.lkSettings}] : []),
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
              <Link className={classNames(styles.item, {[styles.active]: router.asPath.includes(i.link)})} href={i.link}
                    key={index}>
                {router.asPath.includes(i.link) && <div className={styles.line}/>}
                {i.label}
              </Link>
            )}
          </div>
        </div>
        <div className={styles.btn}>
          {showOptions &&
            <MenuOptions/>}
          <Button onClick={() => setShowOptions(!showOptions)} styleType='large' color='green'>
            New Job
          </Button>
        </div>
      </div>
    </div>
  )
}
