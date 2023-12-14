import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useState} from 'react'
import classNames from 'classnames'
import {Routes} from '@/types/routes'
import {useRouter} from 'next/router'
import useInterval from 'use-interval'
import {CardViewType} from '@/types/enums'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import ViewToggleFilterButton from '@/components/for_pages/Common/FilterToolbar/ViewToggleFilterButton'
import {ApplyCvListWrapper, useApplyCvListOwnerContext} from '@/context/apply_cv_list_state'
import {useVacancyOwnerContext, VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import JobApplyCard from '@/components/for_pages/Lk/Jobs/JobApplyCard'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import {
  HiringStageListWrapper, useHiringStageListContext
} from '@/context/hiring_stage_list_state'
import CardsLayout from '@/components/ui/CardsLayout'

interface Props {

}

const JobPageInner = (props: Props) => {
  const vacancyOwnerContext = useVacancyOwnerContext()
  const applyCvListContext = useApplyCvListOwnerContext()
  const hiringStageListContext = useHiringStageListContext()
  const [view, setView] = useState<CardViewType>(CardViewType.Card)

  useEffectOnce(() => {
    applyCvListContext.reFetch()
    hiringStageListContext.reFetch()
  })
  const router = useRouter()

  const [bookmark, setBookmark] = useState<boolean>(false)

  const handleBookmark = () => {

  }

  useInterval(() => {
    if (bookmark) {
      setBookmark(false)
    }
  }, 5000)

  return (
    <>
      <div className={styles.container}>
        <PageTitle title={vacancyOwnerContext.vacancy?.name ?? ''} link={Routes.lkJobs}/>
        <div className={styles.wrapper}>
          <FilterToolbar left={[]} right={<ViewToggleFilterButton onChange={setView} view={view}/>}/>
          {/* <div className={classNames(styles.cards, {[styles.rows]: view === CardViewType.Row})}>
            {applyCvListContext.data.data.map((i, index) =>
              <JobApplyCard view={view} className={styles.card} cv={i} key={i.id}/>
            )}
          </div> */}
          <CardsLayout type={view===CardViewType.Row ? 'list' : 'cards'}>
            {applyCvListContext.data.data.map((i, index) =>
              <JobApplyCard view={view} className={styles.card} cv={i} key={i.id}/>
            )}
          </CardsLayout>
        </div>
      </div>
    </>
  )
}
const JobPage = (props: Props) => {
  const router = useRouter()
  const vacancyId = parseInt(router.query.id as string, 10)
  return (<VacancyOwnerWrapper vacancyId={vacancyId}>
    <HiringStageListWrapper vacancyId={vacancyId}>
      <ApplyCvListWrapper vacancyId={vacancyId}>
        <JobPageInner/>
      </ApplyCvListWrapper>
    </HiringStageListWrapper>
  </VacancyOwnerWrapper>)
}
JobPage.getLayout = LkPageHirerLayout
export default JobPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
