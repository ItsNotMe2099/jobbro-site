import Link from 'next/link'
import styles from 'components/layout/Header/index.module.scss'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'
import BellSvg from '@/components/svg/BellSvg'
import AccSvg from '@/components/svg/AccSvg'
import IconButton from '@/components/ui/IconButton'
import {useAppContext} from '@/context/state'
import {ProfileType} from '@/data/enum/ProfileType'
import {Routes} from '@/types/routes'

interface Props {

}

export default function Header(props: Props) {
  const appContext = useAppContext()
  const menu = appContext.aboutMe?.profileType === ProfileType.Employee ? [
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
  const handleLogout = () => {
    appContext.logout()
    setTimeout(() => {
      window.location.href = ''
    }, 100)
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
        <IconButton bgColor='green'>
          <ChatSvg color={colors.white} />
        </IconButton>
        <IconButton bgColor='green'>
          <BellSvg color={colors.white} />
        </IconButton>
        <IconButton bgColor='green' onClick={handleLogout}>
          <AccSvg color={colors.white} />
        </IconButton>
      </div>
    </div>
  )
}
