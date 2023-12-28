import styles from './index.module.scss'

import Link from 'next/link'
import HouseSvg from '@/components/svg/HouseSvg'
import { Routes } from '@/types/routes'
import EnvelopeSvg from '@/components/svg/EnvelopeSvg'
import ChatTabSvg from '@/components/svg/ChatTabSvg'
import BookmarkTabSvg from '@/components/svg/BookMarkTabSvg'
import UserTabSvg from '@/components/svg/UserTabSvg'
import { useAppContext } from '@/context/state'
import { ProfileType } from '@/data/enum/ProfileType'

interface Props {
}

export default function TabBar(props: Props) {
  const appContext = useAppContext()
  const profileType = appContext.aboutMe?.profileType


  return (<div className={styles.root}> 
  <div className={styles.wrapper}>
    <Link className={styles.link} href={Routes.index}><HouseSvg/>  Main</Link>
    {
      profileType === ProfileType.Employee &&
      <Link className={styles.link} href={Routes.lkApplies}><EnvelopeSvg/>  Applies</Link>
      ||
      <Link className={styles.link} href={Routes.lkHiringBoards}><EnvelopeSvg/>  Hiring</Link>
    }
    <Link className={styles.link} href={Routes.marks}><BookmarkTabSvg/>  Marks</Link>
    <Link className={styles.link} href={Routes.chat}><ChatTabSvg/>  Chat</Link>
    <Link className={styles.link} href={profileType === ProfileType.Employee? Routes.profileResume: Routes.account}><UserTabSvg/>  Profile</Link>
  </div>

  </div>)
}