import styles from './index.module.scss'
import { Routes } from '@/types/routes'
import OfficeCard from 'components/for_pages/Lk/YourCompany/Offices/OfficeCard'
import classNames from 'classnames'
import { OfficeListOwnerWrapper, useOfficeListOwnerContext } from '@/context/office_owner_list_state'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkCompanyPageLayout } from '@/components/for_pages/Lk/YourCompany/LkCompanyLayout'
import { useEffectOnce } from '@/components/hooks/useEffectOnce'
import ContentLoader from '@/components/ui/ContentLoader'
import StickyFab from '@/components/for_pages/Common/StickyFab'
import { useRef } from 'react'
import { Nullable } from '@/types/types'
import { useRouter } from 'next/router'
import NoData from '@/components/for_pages/Common/NoData'
import CardsLayout from '@/components/ui/CardsLayout'
import useTranslation from 'next-translate/useTranslation'


interface Props {

}

const LkCompanyOfficesPageInner = (props: Props) => {
  const router = useRouter()
  const officeListOwnerContext = useOfficeListOwnerContext()
  const {t} = useTranslation()
  const ref = useRef<Nullable<HTMLDivElement>>(null)
  useEffectOnce(() => {
    officeListOwnerContext.reFetch()
  })
  return (
    <div ref={ref} className={classNames(styles.root, { [styles.cards]: officeListOwnerContext.data.total > 0 })}>
      {officeListOwnerContext.isLoaded && officeListOwnerContext.data.total === 0 &&
        <NoData title={t('office_stub_title')} text={t('office_stub_desc')}
                btn={t('office_stub_action')} btnHref={Routes.lkCompanyOfficeCreate}
         />
      }
      {!officeListOwnerContext.isLoaded && officeListOwnerContext.isLoading &&
        <ContentLoader style={'page'} isOpen={true} />}
      {officeListOwnerContext.isLoaded && officeListOwnerContext.data.total > 0 &&
      <CardsLayout>
        {officeListOwnerContext.data.data.map((i, index) =>
          <OfficeCard className={styles.office} key={index} office={i} />
        )}
      </CardsLayout>
      }
      <StickyFab boundaryElement={styles.root} containerRef={ref}
        onClick={() => router.push(Routes.lkCompanyOfficeCreate)} />
    </div>
  )
}


const LKCompanyOfficesPage = (props: Props) => {
  return <OfficeListOwnerWrapper>
    <LkCompanyOfficesPageInner {...props} />
  </OfficeListOwnerWrapper>
}

LKCompanyOfficesPage.getLayout = LkCompanyPageLayout
export default LKCompanyOfficesPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)

