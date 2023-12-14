import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useRef, useState} from 'react'
import JobCard from '@/components/for_pages/Lk/Jobs/JobCard'
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


const JobsPageInner = () => {
  const appContext = useAppContext()
  const ref = useRef<Nullable<HTMLDivElement>>(null)
  const [view, setView] = useState<CardViewType>(CardViewType.Card)
  const vacancyListContext = useVacancyListOwnerContext()
  const [showMenu, setShowMenu] = useState<boolean>(false)

  useEffectOnce(() => {
    vacancyListContext.reFetch()
  })
  return (
      <div ref={ref} className={styles.container}>
        <PageStickyHeader boundaryElement={styles.container} formRef={ref}>
        <PageTitle title='Jobs'/>
        <FilterToolbar key={'sort'} left={[<SortFilterButton<VacancyOwnerListSortType> value={vacancyListContext.sortType} options={[
          {label: 'From New to Old', value: VacancyOwnerListSortType.FromNewToOld},
          {label: 'From Old to New', value: VacancyOwnerListSortType.FromOldToNew},
          {label: 'Low to High Salary', value: VacancyOwnerListSortType.FromLowToHighSalary},
          {label: 'High to Low Salary', value: VacancyOwnerListSortType.FromHighToLowSalary}
        ]} onChange={(sort) => vacancyListContext.setSortType(sort ?? null)}/>,
          <FilterButton key={'filter'} hasValue={!vacancyListContext.filterIsEmpty} onClick={() => appContext.showSidePanel(SidePanelType.JobsFilter, {
            ...vacancyListContext.filter,
            onSubmit: vacancyListContext.setFilter
          } as JobFilterSidePanelArguments)}>Filter</FilterButton>
        ]} right={<ViewToggleFilterButton onChange={setView} view={view}/>}/>
        </PageStickyHeader>
        {/* <div className={styles.wrapper}>

          <div className={classNames(styles.cards, {[styles.rows]: view === 'row'})}>
            {vacancyListContext.data.data.map((i, index) =>
              <JobCard view={view} className={styles.card} vacancy={i} key={i.id}/>
            )}


          </div>
        </div> */}
        <CardsLayout type={view==='row' ? 'list' : 'cards'}>
          {vacancyListContext.data.data.map(i =>
            <JobCard view={view} className={styles.card} vacancy={i} key={i.id}/>
          )}
        </CardsLayout>
        <StickyFab boundaryElement={styles.container} containerRef={ref}>
          <div className={styles.plus}>
            {showMenu ? <MenuOptions className={styles.menu}/> : <></>}
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
