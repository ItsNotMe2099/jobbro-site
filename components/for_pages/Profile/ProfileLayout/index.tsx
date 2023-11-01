import styles from './index.module.scss'
import { ReactElement } from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { nestLayout } from '@/utils/nestLayout'
import Tabs from '@/components/ui/Tabs'
import { IOption } from '@/types/types'
import { Routes } from '@/types/routes'
import { ProfileCalendar } from '../ProfileCalendar'
import { useRouter } from 'next/router'

enum TabKey {
  Resume = 'resume',
  Settings = 'settings',
}


interface Props {
  children: ReactElement
}
const ProfilePageLayoutInner = (props: Props) => {
  const options: IOption<TabKey>[] = [
    { label: 'Resume', value: TabKey.Resume, href: Routes.profileResume },
    { label: 'Settings', value: TabKey.Settings, href: Routes.profileSettings },
  ]

  const router = useRouter()

  return (
    <div className={styles.root}>
      <PageTitle title={router.asPath.includes('edit') ? 'Editor resume' : 'Profile'}
        link={router.asPath.includes('edit') ? Routes.profile : ''} />
      {!router.asPath.includes('edit') && <Tabs<TabKey> options={options} />}
      {props.children}
    </div>
  )
}


const ProfilePageLayoutWrapper = (props: Props) => {

  return (
    <ProfilePageLayoutInner>{props.children}</ProfilePageLayoutInner>
  )
}


export const ProfilePageLayout = nestLayout(ProfileCalendar, (page: ReactElement) => <ProfilePageLayoutWrapper>{page}</ProfilePageLayoutWrapper>)
