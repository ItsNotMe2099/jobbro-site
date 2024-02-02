import styles from './index.module.scss'
import { ReactElement, useState } from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { nestLayout } from '@/utils/nestLayout'
import Tabs from '@/components/ui/Tabs'
import { IOption } from '@/types/types'
import { Routes } from '@/types/routes'
import { ProfileCalendar } from '../ProfileCalendar'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useAppContext } from '@/context/state'

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
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size

  const { t } = useTranslation()
  const options: IOption<TabKey>[] = [
    { label: t('employee_profile_tab_resume'), value: TabKey.Resume, href: Routes.profileResume },
    { label: t('employee_profile_tab_settings'), value: TabKey.Settings, href: Routes.profileSettings },
  ]

  const [page, setPage] = useState<number>(1)
  const [value, setValue] = useState<string>('')

  const serachRequest = async (value: string) => {
    setValue(value)
    await setPage(1)
    //fetch here
  }


  /*  
  TODO: переделать, просто например на странице /lk/applies показывался тайтл Profile и табы, а должно быть просто Applies,
  и добавлять еще кучу условий не очень решение 
  */
  const title = (() => {
    if(router.asPath.includes('edit')) {
      return {name: 'Editor resume', invertColors: isTabletWidth}
    }
    else if(router.asPath.includes('chat')) {
      return {name: 'Chat'}
    }
    else if(router.asPath.includes('profile')) {
      return {name: 'Profile'}
    }
    else if(router.asPath.includes('applies')) {
      return {name: 'Applies'}
    }
    else {
      return {name:''}
    }
  })()



  return (
    <div className={styles.root}>
      <PageTitle 
      invertColors={title.invertColors}
      title={title.name}
      link={router.asPath.includes('edit') ? Routes.profile : ''} 
      />

      {!router.asPath.includes('edit') && router.asPath.includes('profile') && <Tabs<TabKey> options={options} />}
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
