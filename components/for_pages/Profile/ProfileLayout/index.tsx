import styles from './index.module.scss'
import { ReactElement } from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { nestLayout } from '@/utils/nestLayout'
import Tabs from '@/components/ui/Tabs'
import { IOption } from '@/types/types'
import { Routes } from '@/types/routes'
import { ProfileCalendar } from '../ProfileCalendar'

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

  return (
    <div className={styles.root}>
      <PageTitle title='Profile' />
      <Tabs<TabKey> options={options} />
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
