import styles from './index.module.scss'
import {LkPageLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import Filter from '@/components/for_pages/Lk/Jobs/Filter'
import {useRef, useState} from 'react'
import JobCard from '@/components/for_pages/Lk/Jobs/JobCard'
import MenuOptions from '@/components/for_pages/Common/MenuOptions'
import classNames from 'classnames'
import SortDropdown from '@/components/for_pages/Lk/Jobs/Filter/SortDropdown'
import {JobFilterWrapper} from '@/context/job_filter_state'
import StickyFab from '@/components/for_pages/Common/StickyFab'
import {Nullable} from '@/types/types'
import Fab from '@/components/for_pages/Common/Fab'
import {useVacancyListOwnerContext, VacancyListOwnerWrapper} from '@/context/vacancy_owner_list_state'
import {CardViewType} from '@/types/enums'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'


const JobsPageInner = () => {
  const ref = useRef<Nullable<HTMLDivElement>>(null)
  const [view, setView] = useState<CardViewType>(CardViewType.Card)
  const vacancyListContext = useVacancyListOwnerContext()

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const [showSort, setShowSort] = useState<boolean>(false)

  const sortOptions = [
    {label: 'From New to Old', value: 'From New to Old'},
    {label: 'From Old to New', value: 'From Old to New'},
    {label: 'Low to High Salary', value: 'Low to High Salary'},
    {label: 'High to Low Salary', value: 'High to Low Salary'},
  ]

  const [sort, setSort] = useState<string>('')
  useEffectOnce(() => {
    vacancyListContext.reFetch()
  })
  return (
    <JobFilterWrapper>
      <div ref={ref} className={styles.container}>
        <PageTitle title='Jobs'/>
        <div className={styles.wrapper}>
          <Filter sort={sort !== ''} showChild={() => setShowSort(!showSort)}
                  view={view} onSetView={() => setView(view === CardViewType.Card ? CardViewType.Row : CardViewType.Card)}>
            {showSort ? <SortDropdown onDefault={() => setSort('')}
                                      className={styles.sort} options={sortOptions} val={sort}
                                      setVal={(val) => setSort(val as string)}/> : <></>}
          </Filter>
          <div className={classNames(styles.cards, {[styles.rows]: view === 'row'})}>
            {vacancyListContext.data.data.map((i, index) =>
              <JobCard view={view} className={styles.card} vacancy={i} key={i.id}/>
            )}


          </div>
        </div>
        <StickyFab boundaryElement={styles.container} containerRef={ref}>
          <div className={styles.plus}>
            {showMenu ? <MenuOptions className={styles.menu}/> : <></>}
            <Fab active={showMenu} onClick={() => setShowMenu(!showMenu)}/>
          </div>

        </StickyFab>
      </div>
    </JobFilterWrapper>
  )
}
const JobsPage = () => {
  return <VacancyListOwnerWrapper>
    <JobsPageInner/>
  </VacancyListOwnerWrapper>
}
JobsPage.getLayout = LkPageLayout
export default JobsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
