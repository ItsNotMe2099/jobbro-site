import styles from 'components/for_pages/FindJobs/Header/index.module.scss'

import Button from '@/components/ui/Button'
import Card from '@/components/for_pages/Common/Card'
import InputSearch from '@/components/ui/InputSearch'
import { useAppContext } from '@/context/state'
import { useState } from 'react'
import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'
import MainFilters from 'components/for_pages/FindJobs/MainFilters'
import { useRouter } from 'next/router'
import {useFindJobsMainContext} from '@/context/find_jobs_main_state'
import Formatter from '@/utils/formatter'

interface Props {

}

export default function Header(props: Props) {
  const appContext = useAppContext()

  const findJobsMainContext = useFindJobsMainContext()
  const stats = findJobsMainContext.stats
  const {isTabletWidth} = appContext.size
  const [filters, setFilters] = useState<IVacancyFilterParams>({})
  const router = useRouter()
  const [activeFilters, setActiveFilters] = useState<boolean>(false)


  const onSearchEnter = (s: string) => {
    const dataToSend = {...filters}
    dataToSend.countries?.filter(Boolean)?.length === 0 && delete dataToSend.countries
    router.push({pathname: '/find-jobs/search', query: {search: s, filter: JSON.stringify(dataToSend)}})
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <InputSearch
            searchRequest={() => null}
            onEnterClick={onSearchEnter}
            placeholder={isTabletWidth? 'Search':'Profession, position or company'}
            searchIcon
            onFilterClick={()=> setActiveFilters(!activeFilters)}
            showFilterButton={isTabletWidth}
          />
          <>
          {((isTabletWidth && activeFilters)||(!isTabletWidth)) &&
            <MainFilters onChange={(data: IVacancyFilterParams) => setFilters(state=> ({...state, ...data}))} filters={filters}/>
          }
          </>
        </Card>
        {!isTabletWidth &&
        <div className={styles.bottom}>
          <div className={styles.stats}>
            {stats?.cvs_count && <div className={styles.stat}>
              <div className={styles.number}>
                {Formatter.formatNumber(stats?.cvs_count!)}
              </div>
              <div className={styles.name}>
                Summary
              </div>
            </div>}
            {stats?.vacancies_count && <div className={styles.stat}>
              <div className={styles.number}>
                {Formatter.formatNumber(stats?.vacancies_count!)}
              </div>
              <div className={styles.name}>
                Vacancies
              </div>
            </div>}
            {stats?.companies_count && <div className={styles.stat}>
              <div className={styles.number}>
                {Formatter.formatNumber(stats?.companies_count!)}
              </div>
              <div className={styles.name}>
                Companies
              </div>
            </div>}
          </div>
          <div className={styles.btns}>
            <Button className={styles.btn} styleType='large' color='white'>
              Post a CV
            </Button>
            <div className={styles.or}>Or</div>
            <Button className={styles.btn} styleType='large' color='white'>
              Post a vacancy
            </Button>
          </div>
        </div>
        }
      </div>

    </div>
  )
}
