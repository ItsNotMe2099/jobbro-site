import styles from './index.module.scss'
import { ReactElement, useState } from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { nestLayout } from '@/utils/nestLayout'
import Tabs from '@/components/ui/Tabs'
import { IOption } from '@/types/types'
import { Routes } from '@/types/routes'
import { ProfileCalendar } from '../ProfileCalendar'
import { useRouter } from 'next/router'
import Card from '../../Common/Card'
import InputSearch from '@/components/ui/InputSearch'

enum TabKey {
  Resume = 'resume',
  Settings = 'settings',
  All = 'all',
  Invites = 'invites',
  RequirementsAnswer = 'requirementsAnswer'
}


interface Props {
  children: ReactElement
}
const ProfilePageLayoutInner = (props: Props) => {
  const router = useRouter()
  const options: IOption<TabKey>[] = router.asPath.includes('profile') ? [
    { label: 'Resume', value: TabKey.Resume, href: Routes.profileResume },
    { label: 'Settings', value: TabKey.Settings, href: Routes.profileSettings },
  ] : [
    { label: 'All', value: TabKey.All, href: Routes.chatAll },
    { label: 'Invites', value: TabKey.Invites, href: Routes.chatInvites },
    { label: 'Requirements answer', value: TabKey.RequirementsAnswer, href: Routes.chatRequirementsAnswer },
  ]

  const [page, setPage] = useState<number>(1)
  const [value, setValue] = useState<string>('')

  const serachRequest = async (value: string) => {
    setValue(value)
    await setPage(1)
    //fetch here
  }

  return (
    <div className={styles.root}>
      <PageTitle title={router.asPath.includes('edit') ? 'Editor resume' : router.asPath.includes('chat') ? 'Chat' : 'Profile'}
        link={router.asPath.includes('edit') ? Routes.profile : ''} />
      {!router.asPath.includes('edit') && <Tabs<TabKey> options={options} />}
      {router.asPath.includes('chat') &&
        <Card>
          <InputSearch searchIcon searchRequest={(value) => serachRequest(value)} />
        </Card>}
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
