import styles from './index.module.scss'
import { ReactElement } from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { nestLayout } from '@/utils/nestLayout'
import { LkPageHirerLayout } from '@/components/for_pages/Lk/components/LkLayout'
import Tabs from '@/components/ui/Tabs'
import { IOption } from '@/types/types'
import { Routes } from '@/types/routes'

enum TabKey {
  MyBoard = 'my-board',
  Team = 'team'
}


interface Props {
  children: ReactElement
}
const LkDashboardPageLayoutInner = (props: Props) => {
  const options: IOption<TabKey>[] = [
    { label: 'My board', value: TabKey.MyBoard, href: Routes.lkDashboardMyBoard },
    { label: 'Team', value: TabKey.Team, href: Routes.lkDashboardTeam },
  ]

  return (
    <div className={styles.root}>
      <PageTitle title='Dashboard' />
      <Tabs<TabKey> options={options} />
      {props.children}
    </div>
  )
}


const LkDashboardPageLayoutWrapper = (props: Props) => {

  return (
    <LkDashboardPageLayoutInner>{props.children}</LkDashboardPageLayoutInner>
  )
}


export const LkDashboardPageLayout = nestLayout(LkPageHirerLayout, (page: ReactElement) => <LkDashboardPageLayoutWrapper>{page}</LkDashboardPageLayoutWrapper>)