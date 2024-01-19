import styles from './index.module.scss'

import { ServiceCategoryListOwnerWrapper } from '@/context/service_category_list_state'
import Filters from './Filters'
import FilteredVacancies from './FilteredVacancies'
import { VacancySearchWrapper } from '@/context/vacancy_search_state'

interface Props {
}

export default function Search(props: Props) {

  return (
    <VacancySearchWrapper>
      <div className={styles.root}>
        <ServiceCategoryListOwnerWrapper>
          <Filters/>
        </ServiceCategoryListOwnerWrapper>
        <FilteredVacancies/>
      </div>
    </VacancySearchWrapper>
  )
}