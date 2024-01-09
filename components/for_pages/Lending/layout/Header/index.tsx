import ArrowChevronRightSvg from '@/components/svg/ArrowChevronRightSvg'
import Button from '@/components/ui/Button'
import { colors } from '@/styles/variables'
import styles from './index.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { useResize } from '@/components/hooks/useResize'
import MobileMenuSvg from '@/components/svg/MobileMenuSvg'
import CloseSvg from '@/components/svg/CloseSvg'
import {Routes} from '@/types/routes'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export default function Header(props: Props) {
  const { t } = useTranslation()
  const [isMenuMobileOpen, setMenuMobileOpen] = useState<boolean>(false)

  const { isPhoneWidth } = useResize()

  const handleOpenMobileMenu = () => {
    if (typeof window !== undefined) {
      if (isMenuMobileOpen) {
        document.body.classList.remove('modal-open')
      } else {
        document.body.classList.add('modal-open')
      }

    }

    setMenuMobileOpen(!isMenuMobileOpen)
  }

  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        Jobbro
      </div>
      {isPhoneWidth ?
        <>
          {isMenuMobileOpen ?
            <CloseSvg onClick={handleOpenMobileMenu} color={colors.white} />
            :
            <MobileMenuSvg onClick={handleOpenMobileMenu} color={colors.white} />
          }
        </>
        :
        <div className={styles.right}>
          <div className={styles.links}>
            <Link className={styles.link} href={'#'}>
              {t('main_lending_header_menu_contacts')}
            </Link>
            <Link className={styles.link} href={Routes.findJobs}>
              {t('main_lending_header_menu_find_jobs')}
            </Link>
          </div>
          <Button href={'#application'} className={styles.btn} color='transparent' styleType='small'>
            {t('main_lending_header_button_try_demo')} <ArrowChevronRightSvg color={colors.white} />
          </Button>
        </div>
      }
      {isMenuMobileOpen &&
        <div className={styles.dropdownMobile}>
          <div className={styles.right}>
            <div className={styles.links}>
              <Link className={styles.link} href={'#'}>
                {t('main_lending_header_menu_contacts')}
              </Link>
              <Link className={styles.link} href={Routes.findJobs}>
                {t('main_lending_header_menu_find_jobs')}
              </Link>
            </div>
            <Button className={styles.btn} color='transparent' styleType='small'>
              {t('main_lending_header_button_try_demo')} <ArrowChevronRightSvg color={colors.white} />
            </Button>
          </div>
        </div>}
    </div>
  )
}
