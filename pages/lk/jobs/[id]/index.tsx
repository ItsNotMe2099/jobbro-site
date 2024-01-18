import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useRef, useState} from 'react'
import {Routes} from '@/types/routes'
import {useRouter} from 'next/router'
import {CardViewType, SidePanelType} from '@/types/enums'
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
import SortFilterButton from '@/components/for_pages/Common/FilterToolbar/SortFilterButton'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'
import {CvFilterSidePanelArguments} from '@/types/side_panel_arguments'
import useTranslation from 'next-translate/useTranslation'
import {CvListSortType} from '@/data/enum/CvListSortType'
import {useAppContext} from '@/context/state'
import NoData from '@/components/for_pages/Common/NoData'
import ContentLoader from '@/components/ui/ContentLoader'
import {Nullable} from '@/types/types'
import PageStickyHeader from '@/components/for_pages/Common/PageStickyHeader'
import Spinner from '@/components/ui/Spinner'
import {colors} from '@/styles/variables'
import DropdownActionFilterButton from '@/components/for_pages/Common/FilterToolbar/DropdownFilterButton'
import CloseSvg from '@/components/svg/CloseSvg'
import IconButton from '@/components/ui/IconButton'
import MenuButton from '@/components/ui/MenuButton'
import classNames from 'classnames'
enum MenuMultiKey{
  AddToBase = 'addToBase',
  InviteToOtherJob = 'inviteToOtherJob',
}
interface Props {

}

const JobPageInner = (props: Props) => {
  const appContext = useAppContext()
  const vacancyOwnerContext = useVacancyOwnerContext()
  const applyCvListContext = useApplyCvListOwnerContext()
  const hiringStageListContext = useHiringStageListContext()
  const { t } = useTranslation()

  const containerRef = useRef<Nullable<HTMLDivElement>>(null)
  const [view, setView] = useState<CardViewType>(CardViewType.Card)

  useEffectOnce(() => {
    applyCvListContext.reFetch()
    hiringStageListContext.reFetch()
  })

  const handleClickChangeStatusItem = (hiringStageId: number | string | null | undefined) => {
    if(hiringStageId === 'reject'){
      applyCvListContext.rejectMulti()
      return
    }
    applyCvListContext.moveToStageMulti(hiringStageId as number)

  }
  const handleMenuMultiClick = (value: MenuMultiKey) => {
    switch (value){

      case MenuMultiKey.AddToBase:
        applyCvListContext.addToBaseMulti()
        break
      case MenuMultiKey.InviteToOtherJob:
        applyCvListContext.inviteToJobMulti()
        break
    }
  }
  return (
    <>
      <div className={styles.container} ref={containerRef}>

        <PageStickyHeader boundaryElement={styles.root} formRef={containerRef}>
          <PageTitle title={vacancyOwnerContext.vacancy?.name ?? ''} link={Routes.lkJobs}/>
          <FilterToolbar left={[...((applyCvListContext.selectedIds?.length > 0 || applyCvListContext.isSelectAll) && !applyCvListContext.isActionLoading ? [
            <FilterButton disabled={applyCvListContext.isActionLoading} onClick={() => applyCvListContext.cancelSelection()}><div className={styles.selected}><IconButton onClick={() => applyCvListContext.cancelSelection()}><CloseSvg color={colors.green}/></IconButton><div>{applyCvListContext.isSelectAll ? t('job_applies_select_selected_all') : t('job_applies_select_selected_amount', {count: applyCvListContext.selectedIds?.length ?? 0})}</div></div></FilterButton>,
            <FilterButton disabled={applyCvListContext.isActionLoading} onClick={() => applyCvListContext.setSelectAll(!applyCvListContext.isSelectAll)}>{applyCvListContext.isSelectAll ? t('job_applies_select_unselect_all') : t('job_applies_select_select_all')}</FilterButton>,
            <DropdownActionFilterButton<number | string> onChange={handleClickChangeStatusItem} isLoading={applyCvListContext.isLoading} options={[...hiringStageListContext.data.map(i => ({label: i.title, value: i.id})), {label: t('apply_card_menu_status_action_reject'), value: 'reject', color: colors.textRed}]}>{t('job_applies_select_change_status')}</DropdownActionFilterButton>,
         ] : applyCvListContext.isActionLoading ? [    <Spinner size={24} color={colors.white} secondaryColor={colors.green}/>] : [
            <SortFilterButton<CvListSortType> value={applyCvListContext.sortType} options={[
              {label: t('cv_filter_sort_from_new_to_old'), value: CvListSortType.FromNewToOld},
              {label: t('cv_filter_sort_from_old_to_new'), value: CvListSortType.FromOldToNew},
              {label: t('cv_filter_sort_score_from_low_to_high'), value: CvListSortType.FromLowToHighScore},
              {label: t('cv_filter_sort_score_from_high_to_low'), value: CvListSortType.FromHighToLowScore},
              {label: t('cv_filter_sort_from_low_to_high'), value: CvListSortType.FromLowToHighSalary},
              {label: t('cv_filter_sort_from_high_to_low'), value: CvListSortType.FromHighToLowSalary}
            ]} onChange={(sort) => applyCvListContext.setSortType(sort ?? null)}/>,
            <FilterButton key={'filter'} hasValue={!applyCvListContext.filterIsEmpty} onClick={() => appContext.showSidePanel(SidePanelType.CandidateBaseFilter, {
              showScore: true,
              filter: applyCvListContext.filter,
              onSubmit: applyCvListContext.setFilter
            } as CvFilterSidePanelArguments)}>{t('filter_toolbar_filter')}</FilterButton>
          ]),
            ]} right={applyCvListContext.selectedIds?.length > 0 ? <MenuButton<MenuMultiKey> options={[{label: 'Add to base', value: MenuMultiKey.AddToBase}, {label: 'Invite to other job', value: MenuMultiKey.InviteToOtherJob}]} onClick={handleMenuMultiClick}/> : <ViewToggleFilterButton onChange={setView} view={view}/>}/>
        </PageStickyHeader>
        <div className={styles.wrapper}>
          {applyCvListContext.isLoaded && applyCvListContext.data.total === 0 &&
            <NoData
              title={applyCvListContext.filterIsEmpty ? t('stub_job_applies_filter_title') : t('stub_job_applies_title')}
              text={applyCvListContext.filterIsEmpty ? t('stub_job_applies_filter_desc') : t('stub_job_applies_desc')}
            />
          }
          {!applyCvListContext.isLoaded && applyCvListContext.isLoading &&
            <ContentLoader style={'page'} isOpen={true}/>}
          {applyCvListContext.isLoaded && applyCvListContext.data.total > 0 &&
          <CardsLayout type={view===CardViewType.Row ? 'list' : 'cards'} className={classNames({[styles.selectedMode]: applyCvListContext.selectedIds.length > 0})}>
            {applyCvListContext.data.data.map((i, index) =>
              <JobApplyCard view={view} className={styles.card} cv={i} key={i.id} onSelect={() => applyCvListContext.addToSelectedId(i.id)} isSelected={applyCvListContext.selectedIds.includes(i.id) || applyCvListContext.isSelectAll} isSelectMode={applyCvListContext.selectedIds?.length > 0 || applyCvListContext.isSelectAll}/>
            )}
          </CardsLayout>}
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
