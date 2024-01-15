import styles from './index.module.scss'
import {ReactElement} from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {nestLayout} from '@/utils/nestLayout'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import Tabs from '@/components/ui/Tabs'
import {IOption} from '@/types/types'
import {Routes} from '@/types/routes'
import {useAppContext} from '@/context/state'
import {HirerRole} from '@/data/enum/HirerRole'
import SettingsSvg from '@/components/svg/SettingsSvg'
import Link from 'next/link'

enum TabKey {
  MyBoard = 'my-board',
  Team = 'team'
}


interface Props {
  children: ReactElement
}

const LkDashboardPageLayoutInner = (props: Props) => {
  const appContext = useAppContext()
  const options: IOption<TabKey>[] = [
    {label: 'My board', value: TabKey.MyBoard, href: Routes.lkDashboardMyBoard},
    ...(appContext.aboutMe?.hirerRole === HirerRole.Admin ? [{
      label: 'Team',
      value: TabKey.Team,
      href: Routes.lkDashboardTeam
    }] : [])
  ]

  return (
    <div className={styles.root}>
      <PageTitle title='Dashboard' right={<Link href={Routes.lkSettings}><SettingsSvg/></Link>}/>
      <Tabs<TabKey> options={options}/>
      {props.children}
    </div>
  )
}


const LkDashboardPageLayoutWrapper = (props: Props) => {

  return (
    <LkDashboardPageLayoutInner>{props.children}</LkDashboardPageLayoutInner>
  )
}


export const LkDashboardPageLayout = nestLayout(LkPageHirerLayout, (page: ReactElement) =>
  <LkDashboardPageLayoutWrapper>{page}</LkDashboardPageLayoutWrapper>)
