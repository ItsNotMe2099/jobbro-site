import styles from './index.module.scss'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkPageHirerLayout } from '@/components/for_pages/Lk/components/LkLayout'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import HiringBoardJobCard from '@/components/for_pages/Lk/HiringBoards/HiringBoardListJobCard'
import {
  HiringBoardListSortType,
  HiringBoardListWrapper,
  useHiringBoardListContext
} from '@/context/hiring_board_list_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import useTranslation from 'next-translate/useTranslation'
import SortFilterButton from '@/components/for_pages/Common/FilterToolbar/SortFilterButton'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'
import {SidePanelType} from '@/types/enums'
import {JobFilterSidePanelArguments} from '@/types/side_panel_arguments'
import {useAppContext} from '@/context/state'
import NoData from '@/components/for_pages/Common/NoData'
import ContentLoader from '@/components/ui/ContentLoader'
import {useRef} from 'react'
import {Nullable} from '@/types/types'
import PageStickyHeader from '@/components/for_pages/Common/PageStickyHeader'



const HiringBoardsInner = () => {
  const appContext = useAppContext()
  const hiringBoardListContext = useHiringBoardListContext()
  const { t } = useTranslation()
  const containerRef = useRef<Nullable<HTMLDivElement>>(null)
  useEffectOnce(() => {
    hiringBoardListContext.reFetch()
  })
  return (
    <div className={styles.container} ref={containerRef}>
      <PageStickyHeader boundaryElement={styles.root} formRef={containerRef}>
        <PageTitle title={t('hiring_boards_title')} />
        <FilterToolbar key={'sort'} left={[<SortFilterButton<HiringBoardListSortType> value={hiringBoardListContext.sortType} options={[
          {label: t('jobs_filter_sort_from_new_to_old'), value: HiringBoardListSortType.FromNewToOld},
          {label: t('jobs_filter_sort_from_old_to_new'), value: HiringBoardListSortType.FromOldToNew},
          {label: t('jobs_filter_sort_from_low_to_high'), value: HiringBoardListSortType.FromLowToHighSalary},
          {label: t('jobs_filter_sort_from_high_to_low'), value: HiringBoardListSortType.FromHighToLowSalary}
        ]} onChange={(sort) => hiringBoardListContext.setSortType(sort ?? null)}/>,
          <FilterButton key={'filter'} hasValue={!hiringBoardListContext.filterIsEmpty} onClick={() => appContext.showSidePanel(SidePanelType.JobsFilter, {
            filter: hiringBoardListContext.filter,
            onSubmit: hiringBoardListContext.setFilter
          } as JobFilterSidePanelArguments)}>{t('filter_toolbar_filter')}</FilterButton>
        ]} />
      </PageStickyHeader>

      <div className={styles.wrapper}>

        {hiringBoardListContext.isLoaded && hiringBoardListContext.data.total === 0 &&
          <NoData
            title={hiringBoardListContext.filterIsEmpty ? t('stub_hiring_boards_title') : t('stub_hiring_boards_filter_title')}
            text={hiringBoardListContext.filterIsEmpty ? t('stub_hiring_boards_desc') : t('stub_hiring_boards_filter_desc')}
          />
        }
        {!hiringBoardListContext.isLoaded && hiringBoardListContext.isLoading &&
          <ContentLoader style={'page'} isOpen={true}/>}
        {hiringBoardListContext.isLoaded && hiringBoardListContext.data.total > 0 &&
        <div className={styles.cards}>
          {hiringBoardListContext.data.data.map((i, index) =>
              <HiringBoardJobCard vacancy={i} key={i.id} />)
          }
        </div>}
      </div>
    </div>
  )
}

const HiringBoards = () => {
  return (<HiringBoardListWrapper>
    <HiringBoardsInner/>
  </HiringBoardListWrapper>)
}
HiringBoards.getLayout = LkPageHirerLayout

export default HiringBoards
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
