import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useEffect, useMemo, useRef, useState} from 'react'
import MenuOptions from '@/components/for_pages/Common/MenuOptions'
import StickyFab from '@/components/for_pages/Common/StickyFab'
import {IOption, Nullable} from '@/types/types'
import Fab from '@/components/for_pages/Common/Fab'
import {
  useVacancyListOwnerContext,
  VacancyListOwnerWrapper,
  VacancyOwnerListSortType
} from '@/context/vacancy_owner_list_state'
import {CardViewType, ModalType, SidePanelType} from '@/types/enums'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import ViewToggleFilterButton from '@/components/for_pages/Common/FilterToolbar/ViewToggleFilterButton'
import SortFilterButton from '@/components/for_pages/Common/FilterToolbar/SortFilterButton'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'
import {useAppContext} from '@/context/state'
import {JobFilterSidePanelArguments} from '@/types/side_panel_arguments'
import PageStickyHeader from '@/components/for_pages/Common/PageStickyHeader'
import useTranslation from 'next-translate/useTranslation'
import NoData from '@/components/for_pages/Common/NoData'
import ContentLoader from '@/components/ui/ContentLoader'

import ReactDataGrid, {RenderRowProps, Column, RenderHeaderCellProps, Row} from 'react-data-grid'
import type { Key } from 'react'
import VacancyUtils from '@/utils/VacancyUtils'
import classNames from 'classnames'
import SortIconSvg from '@/components/svg/SortIconSvg'
import Formatter from '@/utils/formatter'
import CheckBoxField from '@/components/fields/CheckBoxField'
import { Form, FormikProvider, useFormik } from 'formik'
import { IVacancy } from '@/data/interfaces/IVacancy'
import { Routes } from '@/types/routes'
import Link from 'next/link'
import CardsLayout from '@/components/ui/CardsLayout'
import JobCard from '@/components/for_pages/Lk/Jobs/JobCard'
import JobStatus from '@/components/for_pages/Lk/Jobs/JobCard/JobStatus'
import { VacancyOwnerWrapper, useVacancyOwnerContext } from '@/context/vacancy_owner_state'
import MenuButton from '@/components/ui/MenuButton'
import { useRouter } from 'next/router'
import { IShareModalArgs } from '@/components/modals/ShareModal'
import { colors } from '@/styles/variables'


export type SortDirection = 'ASC' | 'DESC';
export interface SortColumn {
  readonly columnKey: string;
  readonly direction: SortDirection;
}

enum MenuKey{
  Edit = 'edit',
  Duplicate = 'duplicate',
  Share = 'share',
  Delete = 'delete'
}

export interface Row {
  name: string;
  status: JSX.Element | null;
  salary: JSX.Element | null | IVacancy;
  published: string;
  location: string;
  project: string | undefined;
  responseRate: number;
  actions: JSX.Element | null 
  id: number
  vacancy: IVacancy
}

type Comparator = (a: Row, b: Row) => number;
export const getComparator = (sortColumn: string): Comparator => {
  switch (sortColumn) {
    case 'status':
      return (a, b) => {
        return String(a.status).toLowerCase().localeCompare(String(b.status).toLowerCase())
      }
    case 'name':
    case 'location':
    case 'project':
      return (a, b) => {
        return String(a[sortColumn]).toLowerCase().localeCompare(String(b[sortColumn]).toLowerCase())
      }
    case 'salary':
    case 'published':
      return (a, b) => {
        const aDate = new Date(String(a[sortColumn])).getTime()
        const bDate = new Date(String(b[sortColumn])).getTime()

        
        return aDate < bDate? 1:-1
      }
      // return (a, b) => {
      //   return a[sortColumn].localeCompare(b[sortColumn])
      // }
    case 'responseRate':
    case 'actions':
      return (a, b) => {
        return Number(a[sortColumn]) - Number(b[sortColumn])
      }
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`)
  }
}


const RowElement = (props: {row: RenderRowProps<Row, unknown>, key: Key, formik: any}) => {
  const {row, viewportColumns} = props.row
  const {id, vacancy, ...rowValues} = row

  const getCell = (s: string, value: any, id: number) => {
    
    switch(s) {
      case 'published':{
        return <span className={styles.rowSpan} title={value}>{value}</span>
      }
      case 'salary':{
        return <span className={styles.rowSpan} >{value}</span>
      }
      case 'name':
        return <div className={styles.rowLine} >
          <CheckBoxField name={String(id)}/> 
          <Link href={Routes.lkJob(id)} className={styles.rowLink} title={value}>
            {value}
          </Link>
        </div>
      case 'actions': 
        return value
      case 'status':
        return value
        // return (
        //   <p 
        //   className={styles.publishStatus} 
        //   style={{color: value === 'published'&&colors.green||value === 'draft'&&colors.blue||colors.darkOrange}}>
        //     <span className={styles.rowSpan} title={value}>{value}</span>
        //     <ChevronTriangleSvg color={value === 'published'&&colors.green||value === 'draft'&&colors.blue||colors.darkOrange}/>
        //   </p>
        // )
      default :
        return <span className={styles.rowSpan} title={value}>{value}</span>
    }
  }

  return <div role='row'  aria-rowindex={props.row.gridRowStart} className={styles.row} >
    {Object.entries(rowValues).map(([key, value], index) => {
      return (
        <div 
        className={classNames(styles.rowItem, viewportColumns[index]?.frozen&&styles.rowItem_frozen, props.formik.values[String(id)]&&styles.rowItem_active)} 
        style={{gridArea: `${props.row.gridRowStart} / ${index + 1}`}}
        >
          {getCell(viewportColumns[index]?.key, value, id)}
        </div>
      )
    })}
  </div>
}

const ActionButton =(props: {isLast?: boolean})=> {
  const router = useRouter()
  const {t} = useTranslation()
  const appContext = useAppContext()
  const vacancyContext = useVacancyOwnerContext()
  const vacancy = vacancyContext.vacancy!


  const menuOptions: IOption<MenuKey>[] =  [
    {label: t('job_card_menu_edit'), value: MenuKey.Edit},
    {label: t('job_card_menu_duplicate'), value: MenuKey.Duplicate},
    {label: t('job_card_menu_share'), value: MenuKey.Share},
    {label: t('job_card_menu_delete'), value: MenuKey.Delete, color: colors.textRed},
  ]
  const handleMenuItemClick = (key: MenuKey) => {
    switch (key){
      case MenuKey.Edit:
        router.push(Routes.lkJobEdit(vacancy.id))
        break
      case MenuKey.Duplicate:
        router.push(Routes.lkJobClone(vacancy.id))
        break
      case MenuKey.Share:
        appContext.showModal<IShareModalArgs>(ModalType.ShareModal, {link: Routes.getGlobal(Routes.job(vacancy.id))})
        // navigator.clipboard.writeText(Routes.getGlobal(Routes.job(vacancy.id)))
        // showToast({title: t('toast_job_share_copied_link')})
        break
      case MenuKey.Delete:
        vacancyContext.delete()
        break
    }
  }

  return (
    <MenuButton<MenuKey> isLast={props.isLast} className={styles.menuButton} activeClassName={styles.menuButton_active}  options={menuOptions} onClick={handleMenuItemClick}/>
  )
}



const JobsPageInner = () => {
  const appContext = useAppContext()
  const ref = useRef<Nullable<HTMLDivElement>>(null)
  const [view, setView] = useState<CardViewType>(CardViewType.Row)
  const vacancyListContext = useVacancyListOwnerContext()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const { t } = useTranslation()
  useEffectOnce(() => {
    vacancyListContext.reFetch()
  })

  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([])

  const renderHeaderCell = (p: RenderHeaderCellProps<Row, unknown>) => {
    return <div className={classNames(styles.headerCell, p.column.frozen && styles.headerCell_frozen)}>
      {p.column.key === 'name' &&
        <CheckBoxField name={'all'}/>
      }
      {p.column.name}
      {p.sortDirection &&
        <SortIconSvg className={styles.sortIcon} style={{rotate: p.sortDirection === 'ASC'?'0deg':'180deg'}}/>
      }
    </div>
  }





  const columns: Column<Row, unknown>[] = [
    {key: 'name', name: t('job_table_name'), minWidth: 230, frozen: true, sortable: true, renderHeaderCell},
    {key: 'status', name: t('job_table_status'),  minWidth: 130, sortable: true, renderHeaderCell},
    {key: 'salary', name: t('job_table_salary'), minWidth: 150, sortable: true, renderHeaderCell},
    {key: 'published', name: t('job_table_publicationDate'), minWidth: 230,sortable: true, renderHeaderCell},
    {key: 'location', name: t('job_table_location'), minWidth: 144, sortable: true, renderHeaderCell},
    {key: 'project', name: t('job_table_project'), minWidth: 144, sortable: true, renderHeaderCell},
    {key: 'responseRate', name: t('job_table_responseRate'), minWidth: 164 , sortable: true, renderHeaderCell},
    {key: 'actions', name: t('job_table_actions'), minWidth: 86, renderHeaderCell}
  ]

  const rows:Row[] = [...vacancyListContext.data?.data?.map((el, index)=>{
    return {
      name: el.name, 
      status: <JobStatus isLast={index>=vacancyListContext.data?.data?.length-2} key={'status'+(el.id*index)}/>, 
      salary: VacancyUtils.formatSalary({currency: el.currency, salaryMin: el.salaryMin, salaryMax: el.salaryMax, salaryType: el.salaryType}), 
      published: Formatter.formatDate(String(el.publishedAt)), 
      location: el.office?.country.locName, 
      project: el.project?.title, 
      responseRate: 0, 
      actions: <VacancyOwnerWrapper vacancy={el} vacancyId={el.id}>
      <ActionButton key={'menuButton'+el.id} isLast={index>=vacancyListContext.data?.data?.length-3}/>
      </VacancyOwnerWrapper>
      ,
      id: el.id,
      vacancy: el
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

  const formik = useFormik<{all: boolean, [key:string]: any}>({
    initialValues: {
      all: false

    },
    onSubmit: ()=>{}
  })

  useEffect(()=>{
    if(formik.values.all) {
      vacancyListContext.data?.data.forEach(el=> {
        formik.setFieldValue(String(el.id), true)
      })
    }
    else {
      vacancyListContext.data?.data.forEach(el=> {
        formik.setFieldValue(String(el.id), false)
      })
    }
  }, [formik.values.all])

  return (
      <div ref={ref} className={styles.container}>
        <PageStickyHeader boundaryElement={styles.container} formRef={ref}>
        <PageTitle title={t('jobs_title')}/>
        <FilterToolbar
        key={'sort'}
        left={[
          <FilterButton key={'filter'}
          counter={vacancyListContext.filtersCount}
          onClick={() => appContext.showSidePanel(SidePanelType.JobsFilter, {
            filter: vacancyListContext.filter,
            onSubmit: vacancyListContext.setFilter
          } as JobFilterSidePanelArguments)}>
            {t('filter_toolbar_filter')}
          </FilterButton>,

          <SortFilterButton<VacancyOwnerListSortType>
          value={vacancyListContext.sortType}
          options={[
            {label: t('jobs_filter_sort_from_new_to_old'), value: VacancyOwnerListSortType.FromNewToOld},
            {label: t('jobs_filter_sort_from_old_to_new'), value: VacancyOwnerListSortType.FromOldToNew},
            {label: t('jobs_filter_sort_from_low_to_high'), value: VacancyOwnerListSortType.FromLowToHighSalary},
            {label: t('jobs_filter_sort_from_high_to_low'), value: VacancyOwnerListSortType.FromHighToLowSalary}
          ]}
          onChange={(sort) => vacancyListContext.setSortType(sort ?? null)}
          />,
        ]}
        right={<ViewToggleFilterButton onChange={setView} view={view}/>}/>
        </PageStickyHeader>

        {vacancyListContext.isLoaded && vacancyListContext.data.total === 0 &&
          <NoData
            title={vacancyListContext.filtersCount === 0 ? t('stub_jobs_title') : t('stub_jobs_filter_title')}
            text={vacancyListContext.filtersCount === 0 ? t('stub_jobs_desc') : t('stub_jobs_filter_desc')}
          />
        }
        {!vacancyListContext.isLoaded && vacancyListContext.isLoading &&
          <ContentLoader style={'page'} isOpen={true}/>}
        {vacancyListContext.isLoaded && vacancyListContext.data.total > 0 && vacancyListContext.data?.data.length > 0 && view === CardViewType.Row &&
          <FormikProvider value={formik}>
            <Form>
              <ReactDataGrid 
              className={styles.jobsTable}
              rowHeight={48}
              headerRowHeight= {60}
              columns={columns} 
              rows={sortedRows}
              sortColumns={sortColumns}
              onSortColumnsChange={setSortColumns}
              enableVirtualization={vacancyListContext.data?.data.length > 50}
              renderers={{
                renderRow: (k, v) => {
                  return (
                    <VacancyOwnerWrapper vacancy={v.row.vacancy} vacancyId={v.row.id} key={'vacancyContext' + k}>                      
                      <RowElement key={'row'+k} row={v} formik={formik}/>
                    </VacancyOwnerWrapper>
                  )
                  
                }
              }}
              defaultColumnOptions={{
                resizable: true,
              }}
              />
            </Form>
          </FormikProvider>
        }
        {vacancyListContext.isLoaded && vacancyListContext.data.total > 0 && view === CardViewType.Card &&
        <CardsLayout type={'cards'} className={styles.cards}>
          {vacancyListContext.data.data.map(i =>
            <JobCard view={CardViewType.Card} className={styles.card} vacancy={i} key={i.id}/>
          )}
        </CardsLayout>}
        <StickyFab boundaryElement={styles.container} containerRef={ref}>
          <div className={styles.plus}>
            <MenuOptions isActive={showMenu} className={styles.menu} onClick={() => setShowMenu(false)}/>
            <Fab active={showMenu} onClick={() => setShowMenu(!showMenu)}/>
          </div>
        </StickyFab>
      </div>
  )
}
const JobsPage = () => {
  return <VacancyListOwnerWrapper limit={50}>
    <JobsPageInner/>
  </VacancyListOwnerWrapper>
}
JobsPage.getLayout = LkPageHirerLayout
export default JobsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)

