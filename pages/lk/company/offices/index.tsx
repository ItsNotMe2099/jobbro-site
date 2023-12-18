import styles from './index.module.scss'
import Button from '@/components/ui/Button'
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


interface Props {

}

const LkCompanyOfficesPageInner = (props: Props) => {
  const router = useRouter()
  const officeListOwnerContext = useOfficeListOwnerContext()

  const ref = useRef<Nullable<HTMLDivElement>>(null)
  useEffectOnce(() => {
    officeListOwnerContext.reFetch()
  })
  return (
    <div ref={ref} className={classNames(styles.root, { [styles.cards]: officeListOwnerContext.data.total > 0 })}>
      {officeListOwnerContext.isLoaded && officeListOwnerContext.data.total === 0 &&
        <NoData title='Failed find any office' text={<>Every job for publication requires at least the one office<br /> to be added on Jobbro. You can add
          more details so that<br /> candidates find your jobs more easily. Contact us if you<br />
          have issues creating an office.</>}
          btn={<Button href={Routes.lkCompanyOfficeCreate} className={styles.btn} styleType='large' color='green'>
            Add office
          </Button>} />
      }
      {!officeListOwnerContext.isLoaded && officeListOwnerContext.isLoading &&
        <ContentLoader style={'page'} isOpen={true} />}
      {officeListOwnerContext.isLoaded && officeListOwnerContext.data.total > 0 && 
      // <div className={styles.offices}>
      //   {officeListOwnerContext.data.data.map((i, index) =>
      //     <OfficeCard className={styles.office} key={index} office={i} />
      //   )}
      // </div>
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

