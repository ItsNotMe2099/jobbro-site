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
import useTranslation from 'next-translate/useTranslation'

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
  const {t} = useTranslation()
  const options: IOption<TabKey>[] = [
    {label: t('company_tab_details'), value: TabKey.Details, href: Routes.lkCompanyDetails},
    ...(companyOwnerContext.company ? [
      {label:  t('company_tab_career'), value: TabKey.Career, href: Routes.lkCompanyCareer},
      {label:  t('company_tab_offices'), value: TabKey.Offices, href: Routes.lkCompanyOffices},
      {label:  t('company_tab_team'), value: TabKey.Team, href: Routes.lkCompanyTeam},
    ] : [])
  ]
  return (
    <div className={styles.root}>
      <PageTitle title={ t('company_title')} />
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
