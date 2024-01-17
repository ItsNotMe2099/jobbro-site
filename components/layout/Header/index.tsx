import styles from './index.module.scss'

import Link from 'next/link'
import ChatSvg from '@/components/svg/ChatSvg'
import {colors} from '@/styles/variables'
import BellSvg from '@/components/svg/BellSvg'
import AccSvg from '@/components/svg/AccSvg'
import {useAppContext} from '@/context/state'
import {ProfileType} from '@/data/enum/ProfileType'
import {Routes} from '@/types/routes'
import HeaderButton from '@/components/layout/Header/HeaderButton'
import HeaderMenuChat from '@/components/layout/Header/HeaderMenuChat'
import HeaderMenuNotification from '@/components/layout/Header/HeaderMenuNotification'
import {useNotificationContext} from '@/context/notifications_state'
import {NotificationType} from '@/data/interfaces/INotification'
import {useRouter} from 'next/router'
import classNames from 'classnames'
import {useEffect, useState} from 'react'
import useTranslation from 'next-translate/useTranslation'
import LanguageSelector from './LanguageSelector'


enum MenuProfileKey {
  UserProfile = 'profile',
  Logout = 'logout'
}
interface Props {
  distanceFromTop: number
}



export default function Header(props: Props) {
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size
  const router = useRouter()
  const notificationContext = useNotificationContext()
  const [fromTop, setFromTop] = useState<number>(0)
  const { t } = useTranslation()
  const menu = appContext.aboutMe?.profileType === ProfileType.Hirer ? [
    { label: t('header_menu_products'), link: '#' },
    { label: t('header_menu_resources'), link: '#' },
    { label: t('header_menu_pricing'), link: '#' },
  ] : (appContext.aboutMe?.profileType === ProfileType.Employee ? [
    { label: t('header_menu_main'), link: Routes.index },
    { label: t('header_menu_applies'), link: Routes.lkApplies },
    { label: t('header_menu_marks'), link: Routes.marks },
  ] : [
    { label: t('header_menu_search_jobs'), link: Routes.index },
    { label: t('header_menu_create_resume'), link: '/' },
    { label: t('header_menu_login'), link: Routes.login() },
  ])
    const accountOptions = [

    ]

  useEffect(()=>{
    // if(!isTabletWidth) {
      if(props.distanceFromTop > fromTop && props.distanceFromTop <= -40) {
        appContext.setDirection('up')
        setFromTop(props.distanceFromTop)
      }
      else if(props.distanceFromTop < fromTop && props.distanceFromTop <= -40) {
        appContext.setDirection('down')
        // !isTabletWidth && setDropDownOpen(false)
        setFromTop(props.distanceFromTop)
      }
      else {
        appContext.setDirection('up')
      }
    // }
  }, [props.distanceFromTop])

  const handleClickProfileItem = (value: MenuProfileKey) => {
    switch (value){
      case MenuProfileKey.UserProfile:
        if(appContext.aboutMe?.profileType === ProfileType.Hirer){
          router.push(Routes.account)
        }else {
          router.push(Routes.profile)
        }
        break
      case MenuProfileKey.Logout:
        appContext.logout()
        setTimeout(() => {
          window.location.href = ''
        }, 100)
        break
    }
  }
  return (
    <div className={classNames(styles.root, styles[appContext.headerDirection])}>
      <div className={styles.logo}>
        Jobbro
      </div>
      <div className={styles.menu}>
        {!isTabletWidth &&menu.map((i, index) =>
          <Link href={i.link} key={index} className={styles.item}>
            {i.label}
          </Link>
        )}
        {isTabletWidth && <Link href={menu[0].link} className={styles.item}>{menu[0].label}</Link>}
      </div>
      
      {appContext.isLogged &&  <div className={styles.controls}>
        <LanguageSelector/>
        <HeaderButton<string>  dropdownClassName={styles.dropDownNotifications} badge={notificationContext.getTotalByTypes([NotificationType.chatMessage])} icon={<ChatSvg color={colors.white} />} menuRender={(isOpen) => <HeaderMenuChat isOpen={isOpen}/>}/>
        <HeaderButton<string> dropdownClassName={styles.dropDownChats} badge={notificationContext.getTotalByTypes([
          NotificationType.newApplication ,
          NotificationType.newProposal,
          NotificationType.userBlocked,
          NotificationType.userUnBlocked,
          NotificationType.cvRejected,
          NotificationType.vacancyRejected])} icon={<BellSvg color={colors.white} />} menuRender={(isOpen) => <HeaderMenuNotification isOpen={isOpen}/>}/>
        <HeaderButton<MenuProfileKey>
        onClickItem={handleClickProfileItem}
        icon={<AccSvg color={colors.white} />}
        groups={[
          {options: [{label: t('header_user_profile'), value: MenuProfileKey.UserProfile}], },
          {options: [{label: t('header_user_logout'), value: MenuProfileKey.Logout, color: colors.textRed}]}]}
        options={[
          {label: t('header_user_profile'), value: MenuProfileKey.UserProfile},
          {label: t('header_user_logout'), value: MenuProfileKey.Logout, color: colors.textRed},
        ]}/>
      </div>}
    </div>
  )
}
