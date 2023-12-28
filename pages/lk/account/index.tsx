import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useRef, useState} from 'react'
// import classNames from 'classnames'
import {useRouter} from 'next/router'
import PageStickyHeader from '@/components/for_pages/Common/PageStickyHeader'
import Tabs from '@/components/ui/Tabs'
import {IOption, Nullable} from '@/types/types'
import {AboutMeWrapper} from '@/context/aboutme_state'
import AccountProfileForm from '@/components/for_pages/Lk/Account/AccountProfileForm'
import {useAppContext} from '@/context/state'
import ContentLoader from '@/components/ui/ContentLoader'
import useTranslation from 'next-translate/useTranslation'

enum TabKey {
  Profile = 'allProfiles',
  Notification = 'Notification'
}

const LkAccountPageInner = () => {
  const appContext = useAppContext()
  const { t } = useTranslation()
  const [tab, setTab] = useState<TabKey>(TabKey.Profile)
  const router = useRouter()
  const containerRef = useRef<Nullable<HTMLDivElement>>(null)
  const tabs: IOption<TabKey>[] = [
    {label: t('account_tab_profile'), value: TabKey.Profile},
   // {label: 'Notification', value: TabKey.Notification},
  ]

  const handleChangeTab = (tab: TabKey) => {
    setTab(tab)
  }


  return (<div className={styles.root} ref={containerRef}>
      <PageStickyHeader boundaryElement={styles.root} formRef={containerRef}>
        <PageTitle title={t('account_title')}/>
        <Tabs<TabKey> options={tabs} value={tab} onClick={handleChangeTab}/>
      </PageStickyHeader>
      {!appContext.aboutMeLoaded && <ContentLoader style={'block'} isOpen={true}/>}
      {appContext.aboutMeLoaded && tab === TabKey.Profile && <AccountProfileForm/>}
    </div>
  )
}


const LkAccountPage = () => {
  return <AboutMeWrapper>
    <LkAccountPageInner/>
  </AboutMeWrapper>
}
LkAccountPage.getLayout = LkPageHirerLayout
export default LkAccountPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
