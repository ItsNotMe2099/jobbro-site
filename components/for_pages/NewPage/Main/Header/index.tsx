import styles from './index.module.scss'

import Button from '@/components/ui/Button'
import Card from '@/components/for_pages/Common/Card'
import InputSearch from '@/components/ui/InputSearch'
import { useAppContext } from '@/context/state'
import { useState } from 'react'
import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'
import MainFilters from '../MainFilters'

interface Props {

}

export default function Header(props: Props) {
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size
  const [filters, setFilters] = useState<IVacancyFilterParams>({})


  const onSearchEnter = (s: string) => {
    
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
          />
          <MainFilters onChange={(data: IVacancyFilterParams) => setFilters(state=> ({...state, ...data}))} filters={filters}/>

        </Card>
        {!isTabletWidth &&
        <div className={styles.bottom}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.number}>
                41 975
              </div>
              <div className={styles.name}>
                Summary
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.number}>
                641 975
              </div>
              <div className={styles.name}>
                Vacancies
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.number}>
                10 612
              </div>
              <div className={styles.name}>
                Companies
              </div>
            </div>
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
