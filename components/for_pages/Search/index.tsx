import styles from './index.module.scss'

import { ServiceCategoryListOwnerWrapper } from '@/context/service_category_list_state'
import Filters from './Filters'
import FilteredVacancies from './FilteredVacancies'
import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'
import { useAppContext } from '@/context/state'

interface Props {
  search: string;
  filter: IVacancyFilterParams;
}
export default function Search(props: Props) {
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size

  return (
      <div className={styles.root}>
        {!isTabletWidth &&
          <ServiceCategoryListOwnerWrapper>
            <Filters/>
          </ServiceCategoryListOwnerWrapper>
        }
        <FilteredVacancies/>
      </div>
  )
}