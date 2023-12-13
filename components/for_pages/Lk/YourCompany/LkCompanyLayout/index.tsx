import styles from './index.module.scss'
import {ReactElement} from 'react'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {nestLayout} from '@/utils/nestLayout'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import Tabs from '@/components/ui/Tabs'
import {IOption} from '@/types/types'
import {Routes} from '@/types/routes'
import {CompanyOwnerWrapper, useCompanyOwnerContext} from '@/context/company_owner_state'
import ContentLoader from '@/components/ui/ContentLoader'

enum TabKey{
  Details = 'details',
  Career = 'career',
  Offices = 'offices',
  Team = 'team',
}


interface Props{
  children: ReactElement
}
const LkCompanyPageLayoutInner = (props: Props) => {
  const companyOwnerContext = useCompanyOwnerContext()
  const options: IOption<TabKey>[] = [
    {label: 'Details', value: TabKey.Details, href: Routes.lkCompanyDetails},
    {label: 'Offices', value: TabKey.Offices, href: Routes.lkCompanyOffices},
    ...(companyOwnerContext.company ? [
      {label: 'Career page', value: TabKey.Career, href: Routes.lkCompanyCareer},
      {label: 'Offices', value: TabKey.Offices, href: Routes.lkCompanyOffices},
      {label: 'Team', value: TabKey.Team, href: Routes.lkCompanyTeam},
    ] : [])
  ]
  return (
    <div className={styles.root}>
      <PageTitle title='Your Company' />
      <Tabs<TabKey> options={options} />
      {companyOwnerContext.loading ? <ContentLoader style={'page'} isOpen/> : props.children}
    </div>
  )
}


const LkCompanyPageLayoutWrapper = (props: Props) => {

  return (
    <CompanyOwnerWrapper >
      <LkCompanyPageLayoutInner>{props.children}</LkCompanyPageLayoutInner>
    </CompanyOwnerWrapper>
  )
}


export const LkCompanyPageLayout = nestLayout(LkPageHirerLayout, (page: ReactElement) => <LkCompanyPageLayoutWrapper>{page}</LkCompanyPageLayoutWrapper>)
