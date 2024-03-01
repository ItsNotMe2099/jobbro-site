import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useEffect, useMemo, useRef, useState} from 'react'
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
import useTranslation from 'next-translate/useTranslation'
import NoData from '@/components/for_pages/Common/NoData'
import ContentLoader from '@/components/ui/ContentLoader'
import 'react-data-grid/lib/styles.css'

import ReactDataGrid, {RenderRowProps, Column, RenderHeaderCellProps, Row} from 'react-data-grid'
import type { Key } from 'react'
import VacancyUtils from '@/utils/VacancyUtils'
import { PublishStatus } from '@/data/enum/PublishStatus'
import classNames from 'classnames'
import SortIconSvg from '@/components/svg/SortIconSvg'
import Formatter from '@/utils/formatter'
import Button from '@/components/ui/Button'
import MenuSvg from '@/components/svg/MenuSvg'
import { colors } from '@/styles/variables'
import CheckBoxField from '@/components/fields/CheckBoxField'
import { Form, FormikProvider, useFormik } from 'formik'
import { IVacancy } from '@/data/interfaces/IVacancy'
import ChevronTriangleSvg from '@/components/svg/ChevronTriangleSvg'


export type SortDirection = 'ASC' | 'DESC';
export interface SortColumn {
  readonly columnKey: string;
  readonly direction: SortDirection;
}

export interface Row {
  name: string;
  status: PublishStatus;
  salary: JSX.Element | null | IVacancy;
  published: string;
  location: string;
  project: string | undefined;
  responseRate: number;
  actions: JSX.Element | null 
  id: number
}

type Comparator = (a: Row, b: Row) => number;
export const getComparator = (sortColumn: string): Comparator => {
  switch (sortColumn) {
    case 'name':
    case 'status':
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
    {key: 'name', name: 'Name Job', minWidth: 230, frozen: true, sortable: true, renderHeaderCell},
    {key: 'status', name: 'Status',  minWidth: 130, sortable: true, renderHeaderCell},
    {key: 'salary', name: 'Salary', minWidth: 150, sortable: true, renderHeaderCell},
    {key: 'published', name: 'Publiсation date', minWidth: 230,sortable: true, renderHeaderCell},
    {key: 'location', name: 'Job location', minWidth: 144, sortable: true, renderHeaderCell},
    {key: 'project', name: 'Project', minWidth: 144, sortable: true, renderHeaderCell},
    {key: 'responseRate', name: 'Response rate', minWidth: 164 , sortable: true, renderHeaderCell},
    {key: 'actions', name: 'Actions', minWidth: 86, renderHeaderCell}
  ]

  const rows:Row[] = [...vacancyListContext.data?.data?.map(el=>{
    return {
      name: el.name, 
      status: el.status, 
      salary: VacancyUtils.formatSalary({currency: el.currency, salaryMin: el.salaryMin, salaryMax: el.salaryMax, salaryType: el.salaryType}), 
      published: Formatter.formatDate(String(el.publishedAt)), 
      location: el.office?.country.locName, 
      project: el.project?.title, 
      responseRate: 0, 
      actions: <Button className={styles.button}><MenuSvg color='black'/></Button>,
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

  const rowElement = (key: Key, props: RenderRowProps<Row, unknown>) => {
    const {row, viewportColumns} = props
    const {id, ...rowValues} = row
  
    const getCell = (s: string, value: any, id: number) => {
      
      switch(s) {
        case 'published':{
          return <span className={styles.rowSpan} title={value}>{value}</span>
        }
        case 'salary':{
          return <span className={styles.rowSpan} >{value}</span>
        }
        case 'name':
          return <div className={styles.rowLine}>
            <CheckBoxField name={String(id)}/> <span className={styles.rowSpan} title={value}>{value}</span>
          </div>
        case 'actions': 
          return value
        case 'status':
          return (
            <p 
            className={styles.publishStatus} 
            style={{color: value === 'published'&&colors.green||value === 'draft'&&colors.blue||colors.darkOrange}}>
              <span className={styles.rowSpan} title={value}>{value}</span>
              <ChevronTriangleSvg color={value === 'published'&&colors.green||value === 'draft'&&colors.blue||colors.darkOrange}/>
            </p>
          )
        default :
          return <span className={styles.rowSpan} title={value}>{value}</span>
      }
    }

    return <div role='row'  aria-rowindex={props.gridRowStart} className={styles.row} >
      {Object.entries(rowValues).map(([key, value], index) => {
        return (
          <div 
          className={classNames(styles.rowItem, viewportColumns[index]?.frozen&&styles.rowItem_frozen, formik.values[String(id)]&&styles.rowItem_active)} 
          style={{gridArea: `${props.gridRowStart} / ${index + 1}`}}
          >
            {getCell(viewportColumns[index]?.key, value, id)}
          </div>
        )
      })}
    </div>
  }



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
        {vacancyListContext.isLoaded && vacancyListContext.data.total > 0 && vacancyListContext.data?.data.length > 0 &&
          
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
              renderers={{
                // renderCheckbox: (p) => {
                //   console.log('checbox',p)
                //   return <Checkbox checked={false}/>
                // },
                renderRow: (k, v) => rowElement(k, v),
                // renderCheckbox: (p) => {
                //   return <input type="checkbox" checked={p.checked} />
                // }
              }}
                // rowClass={(r, i) => {
                //   console.log(r, i)
                //   return 'myRow'
                // }}
              defaultColumnOptions={{
                resizable: true,
              }}
              />
            </Form>
          </FormikProvider>



      

          
        }
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

