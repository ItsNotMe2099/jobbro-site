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
import { useVacancySearchContext } from '@/context/vacancy_search_state'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export default function Header(props: Props) {
  const appContext = useAppContext()
  const vacancySearchContext = useVacancySearchContext()
  const findJobsMainContext = useFindJobsMainContext()
  const stats = findJobsMainContext.stats
  const {isTabletWidth} = appContext.size
  const [filters, setFilters] = useState<IVacancyFilterParams>({})
  const router = useRouter()
  const {t} = useTranslation()
  const [activeFilters, setActiveFilters] = useState<boolean>(false)


  const onSearchEnter = (s: string) => {
    vacancySearchContext.filters.current = {...filters, search: s}
    router.push('/find-jobs/search')
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <InputSearch
            searchRequest={() => null}
            onEnterClick={onSearchEnter}
            placeholder={isTabletWidth? t('find_jobs_header_search_ph_mobile'):t('find_jobs_header_search_ph_desktop')}
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
                {t('find_jobs_header_stat_summary')}
              </div>
            </div>}
            {stats?.vacancies_count && <div className={styles.stat}>
              <div className={styles.number}>
                {Formatter.formatNumber(stats?.vacancies_count!)}
              </div>
              <div className={styles.name}>
                {t('find_jobs_header_stat_vacancies')}
              </div>
            </div>}
            {stats?.companies_count && <div className={styles.stat}>
              <div className={styles.number}>
                {Formatter.formatNumber(stats?.companies_count!)}
              </div>
              <div className={styles.name}>
                {t('find_jobs_header_stat_companies')}
              </div>
            </div>}
          </div>
          <div className={styles.btns}>
            <Button className={styles.btn} styleType='large' color='white'>
              {t('find_jobs_header_post_cv')}
            </Button>
            <div className={styles.or}>{t('find_jobs_header_or')}</div>
            <Button className={styles.btn} styleType='large' color='white'>
              {t('find_jobs_header_post_vacancy')}
            </Button>
          </div>
        </div>
        }
      </div>

    </div>
  )
}
