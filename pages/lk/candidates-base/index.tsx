import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useRef, useState} from 'react'
import {useRouter} from 'next/router'
import CandidateCard from '@/components/for_pages/Lk/Jobs/CandidateCard'
import {CandidateListWrapper, useCandidateListContext} from '@/context/candidate_list_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import ViewToggleFilterButton from '@/components/for_pages/Common/FilterToolbar/ViewToggleFilterButton'
import {CardViewType, SidePanelType} from '@/types/enums'
import PageStickyHeader from '@/components/for_pages/Common/PageStickyHeader'
import Tabs from '@/components/ui/Tabs'
import {IOption, Nullable} from '@/types/types'
import {Routes} from '@/types/routes'
import CardsLayout from '@/components/ui/CardsLayout'
import useTranslation from 'next-translate/useTranslation'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'
import {useAppContext} from '@/context/state'
import SortFilterButton from '@/components/for_pages/Common/FilterToolbar/SortFilterButton'
import {CvListSortType} from '@/data/enum/CvListSortType'
import {CvFilterSidePanelArguments} from '@/types/side_panel_arguments'
import NoData from '@/components/for_pages/Common/NoData'
import ContentLoader from '@/components/ui/ContentLoader'
import IconButton from '@/components/ui/IconButton'
import CloseSvg from '@/components/svg/CloseSvg'
import {colors} from '@/styles/variables'
import Spinner from '@/components/ui/Spinner'
import MenuButton from '@/components/ui/MenuButton'
import classNames from 'classnames'
enum MenuMultiKey{
  RemoveFromBase = 'removeFromBase',
  InviteToOtherJob = 'inviteToOtherJob',
}
enum TabKey {
  AllProfiles = 'allProfiles',
  UploadCv = 'uploadCv'
}

const CandidatesPageInner = () => {
  const candidateListContext = useCandidateListContext()
  const [view, setView] = useState<CardViewType>(CardViewType.Card)
  const [tab, setTab] = useState<TabKey>(TabKey.AllProfiles)
  const appContext = useAppContext()
  const {t} = useTranslation()
  const router = useRouter()
  const containerRef = useRef<Nullable<HTMLDivElement>>(null)
  const tabs: IOption<TabKey>[] = [
    {label: t('candidates_base_tab_all_profiles'), value: TabKey.AllProfiles},
    {label: t('candidates_base_tab_upload_cv'), value: TabKey.UploadCv},
  ]

  const handleChangeTab = (tab: TabKey) => {
    switch (tab) {
      case TabKey.AllProfiles:
        router.push(Routes.lkCandidatesBase)
        break
      case TabKey.UploadCv:
        router.push(Routes.lkCandidateAiCvRequests)
        break
    }
  }

  const handleMenuMultiClick = (value: MenuMultiKey) => {
    switch (value){

      case MenuMultiKey.RemoveFromBase:
        candidateListContext.removeFromBaseMulti()
        break
      case MenuMultiKey.InviteToOtherJob:
        candidateListContext.inviteToJobMulti()
        break
    }
  }
  useEffectOnce(() => {
    candidateListContext.reFetch()
  })

  return (<div className={styles.root} ref={containerRef}>
      <PageStickyHeader boundaryElement={styles.root} formRef={containerRef}>
        <PageTitle title={t('candidates_base_title')}/>
        <Tabs<TabKey> options={tabs} value={tab} onClick={handleChangeTab}/>
        <>{tab === TabKey.UploadCv && <FilterToolbar left={[]}/>}</>
      </PageStickyHeader>
      <div className={styles.wrapper}>
        <FilterToolbar left={
          [...(candidateListContext.selectedIds?.length > 0 && !candidateListContext.isActionLoading ? [
            <FilterButton disabled={candidateListContext.isActionLoading} onClick={() => candidateListContext.cancelSelection()}><div className={styles.selected}><IconButton onClick={() => candidateListContext.cancelSelection()}><CloseSvg color={colors.green}/></IconButton><div>{candidateListContext.isSelectAll ? t('candidates_base_select_selected_all') : t('candidates_base_select_selected_amount', {count: candidateListContext.selectedIds?.length ?? 0})}</div></div></FilterButton>,
            <FilterButton disabled={candidateListContext.isActionLoading} onClick={() => candidateListContext.setSelectAll(!candidateListContext.isSelectAll)}>{candidateListContext.isSelectAll ? t('candidates_base_select_unselect_all') : t('candidates_base_select_select_all')}</FilterButton>,
          ] : candidateListContext.isActionLoading ? [    <Spinner size={24} color={colors.white} secondaryColor={colors.green}/>] : [
            <SortFilterButton<CvListSortType> value={candidateListContext.sortType} options={[
              {label: t('cv_filter_sort_from_new_to_old'), value: CvListSortType.FromNewToOld},
              {label: t('cv_filter_sort_from_old_to_new'), value: CvListSortType.FromOldToNew},
              {label: t('cv_filter_sort_from_low_to_high'), value: CvListSortType.FromLowToHighSalary},
              {label: t('cv_filter_sort_from_high_to_low'), value: CvListSortType.FromHighToLowSalary}
            ]} onChange={(sort) => candidateListContext.setSortType(sort ?? null)}/>,
            <FilterButton key={'filter'} hasValue={!candidateListContext.filterIsEmpty}
                          onClick={() => appContext.showSidePanel(SidePanelType.CandidateBaseFilter, {
                            filter: candidateListContext.filter,
                            onSubmit: candidateListContext.setFilter
                          } as CvFilterSidePanelArguments)}>{t('filter_toolbar_filter')}</FilterButton>
          ]),
          ]
         } right={candidateListContext.selectedIds?.length > 0 ? <MenuButton<MenuMultiKey> options={[{label: t('candidates_base_select_menu_remove_from_base'), value: MenuMultiKey.RemoveFromBase}, {label: t('candidates_base_select_menu_remove_invite'), value: MenuMultiKey.InviteToOtherJob}]} onClick={handleMenuMultiClick}/> : <ViewToggleFilterButton onChange={setView} view={view}/>}/>

        {candidateListContext.isLoaded && candidateListContext.data.total === 0 &&
          <NoData
            title={candidateListContext.filterIsEmpty ? t('stub_candidate_base_filter_title') : t('stub_candidate_base_title')}
            text={candidateListContext.filterIsEmpty ? t('stub_candidate_base_filter_desc') : t('stub_candidate_base_desc')}
          />
        }
        {!candidateListContext.isLoaded && candidateListContext.isLoading &&
          <ContentLoader style={'page'} isOpen={true}/>}
        {candidateListContext.isLoaded && candidateListContext.data.total > 0 &&
          <CardsLayout type={view === CardViewType.Card ? 'cards' : 'list'} className={classNames({[styles.selectedMode]: candidateListContext.selectedIds.length > 0})}>
            {candidateListContext.data.data.map(i =>
              <CandidateCard view={view} className={styles.card} candidate={i} key={i.id}  onSelect={() => candidateListContext.addToSelectedId(i.id)} isSelected={candidateListContext.selectedIds.includes(i.id) || candidateListContext.isSelectAll} isSelectMode={candidateListContext.selectedIds?.length > 0}/>
            )}
          </CardsLayout>}
      </div>
    </div>
  )
}


const CandidatesPage = () => {
  return <CandidateListWrapper>
    <CandidatesPageInner/>
  </CandidateListWrapper>
}
CandidatesPage.getLayout = LkPageHirerLayout
export default CandidatesPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
