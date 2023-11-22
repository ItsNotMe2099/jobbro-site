import Link from 'next/link'
import styles from 'components/layout/Header/index.module.scss'
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

enum MenuProfileKey {
  UserProfile = 'profile',
  Logout = 'logout'
}
interface Props {

}

export default function Header(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const notificationContext = useNotificationContext()
  const menu = appContext.aboutMe?.profileType === ProfileType.Hirer ? [
    { label: 'Products', link: '#' },
    { label: 'Resources', link: '#' },
    { label: 'Pricing', link: '#' },
  ] : [
    { label: 'Main', link: Routes.index },
    { label: 'Applies', link: Routes.applies },
    { label: 'Marks', link: Routes.marks },
  ]
    const accountOptions = [

    ]

  const handleClickProfileItem = (value: MenuProfileKey) => {
    switch (value){
      case MenuProfileKey.UserProfile:
        router.push(Routes.profile)
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
    <div className={styles.root}>
      <div className={styles.logo}>
        Jobbro
      </div>
      <div className={styles.menu}>
        {menu.map((i, index) =>
          <Link href={i.link} key={index} className={styles.item}>
            {i.label}
          </Link>
        )}
      </div>
      <div className={styles.controls}>
        <HeaderButton<string>  dropdownClassName={styles.dropDownNotifications} badge={notificationContext.getTotalByTypes([NotificationType.chatMessage])} icon={<ChatSvg color={colors.white} />} menuRender={(isOpen) => <HeaderMenuChat isOpen={isOpen}/>}/>
        <HeaderButton<string> dropdownClassName={styles.dropDownChats} badge={notificationContext.getTotalByTypes([
          NotificationType.newApplication ,
          NotificationType.newProposal,
          NotificationType.userBlocked,
          NotificationType.userUnBlocked,
          NotificationType.cvRejected,
          NotificationType.vacancyRejected])} icon={<BellSvg color={colors.white} />} menuRender={(isOpen) => <HeaderMenuNotification isOpen={isOpen}/>}/>
        <HeaderButton<MenuProfileKey> menuRender={(isOpen) => <HeaderMenuChat isOpen={isOpen} />} onClickItem={handleClickProfileItem} icon={<AccSvg color={colors.white} />} groups={[{options: [ {label: 'User profile', value: MenuProfileKey.UserProfile}], }, {options: [ {label: 'Logout', value: MenuProfileKey.Logout, color: colors.textRed}]}]} options={[
          {label: 'User profile', value: MenuProfileKey.UserProfile},
          {label: 'Logout', value: MenuProfileKey.Logout, color: colors.textRed},
        ]}/>

      </div>
    </div>
  )
}
