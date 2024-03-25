import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { useMemo, useRef, useState} from 'react'
import {Routes} from '@/types/routes'
import {useRouter} from 'next/router'
import {CardViewType, ModalType, SidePanelType} from '@/types/enums'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import ViewToggleFilterButton from '@/components/for_pages/Common/FilterToolbar/ViewToggleFilterButton'
import {ApplyCvListWrapper, useApplyCvListOwnerContext} from '@/context/apply_cv_list_state'
import {useVacancyOwnerContext, VacancyOwnerWrapper} from '@/context/vacancy_owner_state'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import {
  HiringStageListWrapper, useHiringStageListContext
} from '@/context/hiring_stage_list_state'
import SortFilterButton from '@/components/for_pages/Common/FilterToolbar/SortFilterButton'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'
import {CvFilterSidePanelArguments} from '@/types/side_panel_arguments'
import useTranslation from 'next-translate/useTranslation'
import {CvListSortType} from '@/data/enum/CvListSortType'
import {useAppContext} from '@/context/state'
import NoData from '@/components/for_pages/Common/NoData'
import ContentLoader from '@/components/ui/ContentLoader'
import {IOption, Nullable} from '@/types/types'
import PageStickyHeader from '@/components/for_pages/Common/PageStickyHeader'
import Spinner from '@/components/ui/Spinner'
import {colors} from '@/styles/variables'
import DropdownActionFilterButton from '@/components/for_pages/Common/FilterToolbar/DropdownFilterButton'
import CloseSvg from '@/components/svg/CloseSvg'
import IconButton from '@/components/ui/IconButton'
import MenuButton from '@/components/ui/MenuButton'

import ReactDataGrid, {RenderRowProps, Column, RenderHeaderCellProps, Row, SortColumn} from 'react-data-grid'
import classNames from 'classnames'
import SortIconSvg from '@/components/svg/SortIconSvg'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import type { Key } from 'react'
import { ApplyCvWrapper, useApplyCvContext } from '@/context/apply_cv_state'
import UserUtils from '@/utils/UserUtils'
import Formatter from '@/utils/formatter'
import DownloadSvg from '@/components/svg/DownloadSvg'
import { useCvEvaluationContext } from '@/context/cv_evaluation_state'
import {runtimeConfig} from '@/config/runtimeConfig'
import LinkSvg from '@/components/svg/LinkSvg'
import RejectSvg from '@/components/svg/RejectSvg'
import { useDropDown } from '@/components/hooks/useDropDown'
import MenuSvg from '@/components/svg/MenuSvg'
import { MenuDropdown } from '@/components/ui/MenuDropdown'
import CardsLayout from '@/components/ui/CardsLayout'
import JobApplyCard from '@/components/for_pages/Lk/Jobs/JobApplyCard'
import Checkbox from '@/components/ui/Checkbox'
import { ICV } from '@/data/interfaces/ICV'
import { useCandidateAddedContext } from '@/context/candidate_added_state'
import { IShareModalArgs } from '@/components/modals/ShareModal'
import { IVacancy } from '@/data/interfaces/IVacancy'
import JobApplyStatus from '@/components/for_pages/Lk/Jobs/JobApplyCard/JobApplyStatus'



enum MenuMultiKey{
  AddToBase = 'addToBase',
  InviteToOtherJob = 'inviteToOtherJob',
}
interface Props {

}

enum MenuKey{
  DownLoadPDF = 'downloadPDF',
  AddToBase = 'addToBase',
  InviteToOtherJob = 'inviteToOtherJob',
  Select = 'select',
  DownloadOriginal = 'downloadOriginal'
}



export interface Row  {
  name: Nullable<string> | undefined;
  rate: string;
  stage: JSX.Element | null
  email: string;
  applied: string;
  location: string
  cv: JSX.Element | null
  actions: JSX.Element | null
  id: number
}

type Comparator = (a: Row, b: Row) => number;
export const getComparator = (sortColumn: string): Comparator => {
  switch (sortColumn) {
    case 'name':
    case 'rate':
    case 'stage':
    case 'email':
    case 'location':
      return (a, b) => {
        return String(a[sortColumn]).toLowerCase().localeCompare(String(b[sortColumn]).toLowerCase())
      }
    case 'applied':
      return (a, b) => {
        const aDate = new Date(String(a[sortColumn])).getTime()
        const bDate = new Date(String(b[sortColumn])).getTime()


        return aDate < bDate? 1:-1
      }
      // return (a, b) => {
      //   return a[sortColumn].localeCompare(b[sortColumn])
      // }
    case 'cv':
    case 'actions':
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`)
  }
}

const RowElement = (props: {rowProps: RenderRowProps<Row, unknown>, key: Key}) => {
  const applyCvContext = useApplyCvContext()
  const applyCvListContext = useApplyCvListOwnerContext()
  const cvEvaluationContext = useCvEvaluationContext()
  const evaluation = cvEvaluationContext.store[`${applyCvContext.cv!.id}:${applyCvContext.apply!.vacancyId!}`]?.evaluation

  const {row, viewportColumns} = props.rowProps
  const {id, ...rowValues} = row

  const getCell = (s: string, value: any, id: number) => {

    switch(s) {
      case 'published':{
        return <span className={styles.rowSpan} title={value}>{value}</span>
      }
      case 'salary':{
        return <span className={styles.rowSpan} >{value}</span>
      }
      case 'rate': {
        return <div className={styles.evaluation}>{evaluation?.percentEvaluation||'0'}%</div>
      }
      case 'name':
        return <div className={styles.rowLine} >
          <Checkbox
          checked={applyCvListContext.selectedIds.includes(id)||applyCvListContext.isSelectAll}
          onClick={el=> {
            el.preventDefault()
            el.stopPropagation()
            applyCvListContext.addToSelectedId(id)
          }}/>
          <Link href={Routes.lkJobCv(applyCvContext.apply!.vacancyId!, id)} className={styles.rowLink} title={value}>
            {value}
          </Link>
        </div>
      case 'actions':
        return value
      case 'stage':
        return value
      case 'cv':
        return value
      default :
        return <span className={styles.rowSpan} title={value}>{value}</span>
    }
  }

  return <div role='row'  aria-rowindex={props.rowProps.gridRowStart} className={styles.row} >
    {Object.entries(rowValues).map(([key, value], index) => {
      return (
        <div
        className={classNames(styles.rowItem, viewportColumns[index]?.frozen&&styles.rowItem_frozen, (applyCvListContext.selectedIds.includes(id)||applyCvListContext.isSelectAll)&&styles.rowItem_active)}
        style={{gridArea: `${props.rowProps.gridRowStart} / ${index + 1}`}}
        >
          {getCell(viewportColumns[index]?.key, value, id)}
        </div>
      )
    })}
  </div>
}

const ActionButtons = (props: {cv: ICV, vacancyId: number}) => {
  const favoriteContext = useCandidateAddedContext()
  const applyCvListContext = useApplyCvListOwnerContext()
  const appContext = useAppContext()
  const {t} = useTranslation()

  const {setRootRef, isActive, setIsActive, popperStyles, setPopperElement, attributes} = useDropDown({offset: [0, 8], placement: 'bottom-end', position: 'absolute'})

  const handleClickItem = (value: MenuKey) => {
    switch(value){
      case MenuKey.DownLoadPDF: {
        window.open(`${runtimeConfig.HOST}/api/cv/${props.cv!.id}/exportToPdf` )
      }
        break
      case MenuKey.AddToBase: {
        favoriteContext.like(props.cv!.id)
      }
        break
      case MenuKey.Select: {
        applyCvListContext.addToSelectedId(props.cv.id)
      }
        break
    }

  }

  const menuOptions: IOption<MenuKey>[] = [
    {label: t('jobId_tableAction_downloadPdf'), value: MenuKey.DownLoadPDF, },
    {label: t('jobId_tableAction_addToBase'), value: MenuKey.AddToBase},
    {label: t('jobId_tableAction_inviteToOther'), value: MenuKey.InviteToOtherJob},
    {label: t('jobId_tableAction_select'), value: MenuKey.Select},
  ]
  if(props.cv.file) {
    menuOptions.push({label: t('jobId_tableAction_downloadOriginal'), value: MenuKey.DownloadOriginal})
  }

  const onShareClick = () => {
    appContext.showModal<IShareModalArgs>(ModalType.ShareModal, {
      link: Routes.getGlobal(Routes.lkJob(props.vacancyId)+`/cv/${props.cv.id}`),
    })
  }



  return (
    <div className={styles.actionButtons} ref={setRootRef}>
      <Button className={styles.button}><RejectSvg/></Button>
      <Button className={styles.button} onClick={onShareClick}><LinkSvg/></Button>
      <Button className={classNames(styles.button, isActive&&styles.button_green)}  onClick={() => setIsActive(!isActive)}><MenuSvg color='black'/></Button>
      <MenuDropdown
      ref={setPopperElement}
      isOpen={isActive as boolean}
      onClick={(v)=> handleClickItem(v)}
      style={popperStyles.popper}
      options={menuOptions}
      {...attributes.popper} />
    </div>
  )
}

const JobPageInner = (props: Props) => {
  const appContext = useAppContext()
  const vacancyOwnerContext = useVacancyOwnerContext()
  const applyCvListContext = useApplyCvListOwnerContext()
  const hiringStageListContext = useHiringStageListContext()
  const { t } = useTranslation()
  const containerRef = useRef<Nullable<HTMLDivElement>>(null)
  const [view, setView] = useState<CardViewType>(CardViewType.Row)

  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([])


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

  const renderHeaderCell = (p: RenderHeaderCellProps<Row, unknown>) => {
    return <div className={classNames(styles.headerCell, p.column.frozen && styles.headerCell_frozen)}>
      {p.column.key === 'name' &&
        <Checkbox
        checked={applyCvListContext.isSelectAll}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          applyCvListContext.setSelectAll(!applyCvListContext.isSelectAll)
        }}
        />
      }
      {p.column.name}
      {p.sortDirection &&
        <SortIconSvg className={styles.sortIcon} style={{rotate: p.sortDirection === 'ASC'?'0deg':'180deg'}}/>
      }
    </div>
  }

  const columns: Column<Row, unknown>[] = [
    {key: 'name', name: t('jobId_table_name'), minWidth: 230, frozen: true, sortable: true, renderHeaderCell},
    {key: 'rate', name: t('jobId_table_rate'),  minWidth: 90, resizable: false, sortable: true, renderHeaderCell},
    {key: 'stage', name:  t('jobId_table_stage'), minWidth: 160, sortable: true, renderHeaderCell},
    {key: 'email', name: t('jobId_table_email'), minWidth: 130,sortable: true, renderHeaderCell},
    {key: 'applied', name: t('jobId_table_appliedOn'), minWidth: 130, sortable: true, resizable: false, renderHeaderCell},
    {key: 'location', name: t('jobId_table_candidateLocation'), minWidth: 184, sortable: true,  renderHeaderCell},
    {key: 'cv', name: t('jobId_table_cv'), minWidth: 164 , sortable: true, renderHeaderCell},
    {key: 'actions', name: t('jobId_table_actions'), minWidth: 170, resizable: false,  renderHeaderCell}
  ]

  const rows:Row[] = [...applyCvListContext.data.data?.map(el=>{
    return {
      name: UserUtils.getName(el),
      rate: 'rate',
      stage: <JobApplyStatus cv={el} className={styles.applyStatus}/>,
      email: el.profile?.email||'',
      applied: Formatter.formatDate(String(el.applications[0].updatedAt)),
      location: el?.city?.locName||'',
      cv: <Link href={`${runtimeConfig.HOST}/api/cv/${el!.id}/exportToPdf`} className={styles.rowLine}><DownloadSvg/> <span className={styles.rowLink}>Original PDF</span></Link>,
      actions: <ActionButtons cv={el} key={'actionButtons'+el.id} vacancyId={Number((vacancyOwnerContext.vacancy as IVacancy).id) }/>,
      id: el.id
    }
  })]

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) {return rows}
    const sortedRows = [...rows]

    sortedRows.sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey)
        const compResult = comparator(a, b)
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult
        }
      }
      return 0
    })
    return sortedRows
  }, [rows, sortColumns])


  return (
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
            {applyCvListContext.isLoaded && applyCvListContext.data.total > 0 && view === CardViewType.Row &&
              <ReactDataGrid
              className={styles.jobsTable}
              rowHeight={48}
              headerRowHeight= {60}
              columns={columns}
              rows={sortedRows}
              sortColumns={sortColumns}
              onSortColumnsChange={setSortColumns}
              renderers={{
                renderRow: (k, v) => {
                  return (
                    <ApplyCvWrapper cv={applyCvListContext.data.data[Number(k)]} >
                      <RowElement key={k} rowProps={v} />
                    </ApplyCvWrapper>
                  )
                  },
                }}
                defaultColumnOptions={{
                  resizable: true,
                }}
              />
            }

          {applyCvListContext.isLoaded && applyCvListContext.data.total > 0 && view === CardViewType.Card &&
          <CardsLayout type={'cards'} className={classNames({[styles.selectedMode]: applyCvListContext.selectedIds.length > 0})}>
            {applyCvListContext.data.data.map((i, index) =>
              <JobApplyCard view={CardViewType.Card} className={styles.card} cv={i} key={i.id} onSelect={() => applyCvListContext.addToSelectedId(i.id)} isSelected={applyCvListContext.selectedIds.includes(i.id) || applyCvListContext.isSelectAll} isSelectMode={applyCvListContext.selectedIds?.length > 0 || applyCvListContext.isSelectAll}/>
            )}
          </CardsLayout>}
        </div>
      </div>
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
