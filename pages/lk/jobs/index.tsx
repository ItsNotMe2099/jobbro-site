import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useRef, useState} from 'react'
import MenuOptions from '@/components/for_pages/Common/MenuOptions'
import StickyFab from '@/components/for_pages/Common/StickyFab'
import {Nullable} from '@/types/types'
import Fab from '@/components/for_pages/Common/Fab'
import {
  useVacancyListOwnerContext,
  VacancyListOwnerWrapper,
  VacancyOwnerListSortType
} from '@/context/vacancy_owner_list_state'
import {CardViewType, SidePanelType} from '@/types/enums'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import ViewToggleFilterButton from '@/components/for_pages/Common/FilterToolbar/ViewToggleFilterButton'
import SortFilterButton from '@/components/for_pages/Common/FilterToolbar/SortFilterButton'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'
import {useAppContext} from '@/context/state'
import {JobFilterSidePanelArguments} from '@/types/side_panel_arguments'
import PageStickyHeader from '@/components/for_pages/Common/PageStickyHeader'
import CardsLayout from '@/components/ui/CardsLayout'
import useTranslation from 'next-translate/useTranslation'
import JobCard from '@/components/for_pages/Lk/Jobs/JobCard'



const JobsPageInner = () => {
  const appContext = useAppContext()
  const ref = useRef<Nullable<HTMLDivElement>>(null)
  const [view, setView] = useState<CardViewType>(CardViewType.Card)
  const vacancyListContext = useVacancyListOwnerContext()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const { t } = useTranslation()
  useEffectOnce(() => {
    vacancyListContext.reFetch()
  })
  return (
      <div ref={ref} className={styles.container}>
        <PageStickyHeader boundaryElement={styles.container} formRef={ref}>
        <PageTitle title={t('jobs_title')}/>
        <FilterToolbar key={'sort'} left={[<SortFilterButton<VacancyOwnerListSortType> value={vacancyListContext.sortType} options={[
          {label: t('jobs_filter_sort_from_new_to_old'), value: VacancyOwnerListSortType.FromNewToOld},
          {label: t('jobs_filter_sort_from_old_to_new'), value: VacancyOwnerListSortType.FromOldToNew},
          {label: t('jobs_filter_sort_from_low_to_high'), value: VacancyOwnerListSortType.FromLowToHighSalary},
          {label: t('jobs_filter_sort_from_high_to_low'), value: VacancyOwnerListSortType.FromHighToLowSalary}
        ]} onChange={(sort) => vacancyListContext.setSortType(sort ?? null)}/>,
          <FilterButton key={'filter'} hasValue={!vacancyListContext.filterIsEmpty} onClick={() => appContext.showSidePanel(SidePanelType.JobsFilter, {
            ...vacancyListContext.filter,
            onSubmit: vacancyListContext.setFilter
          } as JobFilterSidePanelArguments)}>Filter</FilterButton>
        ]} right={<ViewToggleFilterButton onChange={setView} view={view}/>}/>
        </PageStickyHeader>
        <CardsLayout type={view==='row' ? 'list' : 'cards'} className={styles.cards}>
          {vacancyListContext.data.data.map(i =>
            <JobCard view={view} className={styles.card} vacancy={i} key={i.id}/>
          )}
        </CardsLayout>
        <StickyFab boundaryElement={styles.container} containerRef={ref}>
          <div className={styles.plus}>
            {showMenu ? <MenuOptions className={styles.menu} onClick={() => setShowMenu(false)}/> : <></>}
            <Fab active={showMenu} onClick={() => setShowMenu(!showMenu)}/>
          </div>

        </StickyFab>
      </div>
  )
}
const JobsPage = () => {
  return <VacancyListOwnerWrapper>
    <JobsPageInner/>
  </VacancyListOwnerWrapper>
}
JobsPage.getLayout = LkPageHirerLayout
export default JobsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
