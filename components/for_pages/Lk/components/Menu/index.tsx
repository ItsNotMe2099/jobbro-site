import styles from './index.module.scss'

import {Routes} from '@/types/routes'
import {ReactElement, useRef, useState} from 'react'
import Link from 'next/link'
import ArrowsSvg from '@/components/svg/ArrowsSvg'
import classNames from 'classnames'
import {useRouter} from 'next/router'
import Button from '@/components/ui/Button'
import {colors} from '@/styles/variables'
import MenuOptions from '@/components/for_pages/Common/MenuOptions'
import useTranslation from 'next-translate/useTranslation'
import {useAppContext} from '@/context/state'
import {HirerRole} from '@/data/enum/HirerRole'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Menu(props: Props) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const rootRef = useRef<HTMLDivElement>(null!)
  const [isActive, setIsActive] = useDetectOutsideClick(rootRef.current, false)

  const { t } = useTranslation()
  const appContext = useAppContext()
  const {isSmDesktopWidth} = appContext.size
  const router = useRouter()

  const menu = [
 //   { label: t('hirer_left_menu_dashboard'), link: Routes.lkDashboard },
    { label: t('hirer_left_menu_jobs'), link: Routes.lkJobs },
    { label: t('hirer_left_menu_candidates_base'), link: Routes.lkCandidatesBase },
    { label: t('hirer_left_menu_hiring_boards'), link: Routes.lkHiringBoards },
    { label: t('hirer_left_menu_chats'), link: Routes.chat },
    { label: t('hirer_left_menu_your_company'), link: Routes.lkCompany },
    //  { label: t('hirer_left_menu_templates'), link: Routes.lkScorecardsTemplates },
    ...(appContext.aboutMe?.hirerRole === HirerRole.Admin ? [  { label: t('hirer_left_menu_settings'), link: Routes.lkSettings }] : []),
]

  const [showOptions, setShowOptions] = useState<boolean>(false)

  return (
    <div className={classNames(styles.root, {[styles.collapsed]: isSmDesktopWidth? !isActive:isCollapsed}, isSmDesktopWidth&&appContext.headerDirection === 'down'&&styles.down )} ref={rootRef}>
      <div className={styles.wrapper}>
        <div className={styles.first}>
          <div className={styles.top}>
            <div className={styles.title}>
              {t('hirer_left_menu_actions')}
            </div>
            <div className={styles.arrows} onClick={() => isSmDesktopWidth?setIsActive(i => !i):setIsCollapsed(i => !i)}>
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
          <MenuOptions className={styles.menuOptions} isActive={showOptions} onClick={() => setShowOptions(false)}/>
          <Button onClick={() => setShowOptions(!showOptions)} styleType='large' color='green'>
            {t('hirer_left_menu_new_job')}
          </Button>
        </div>
      </div>
    </div>
  )
}
