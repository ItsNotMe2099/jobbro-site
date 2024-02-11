import styles from './index.module.scss'

import { useRouter } from 'next/navigation'
import PageTitle from '../../Common/PageTitle'
import InputSearch from '@/components/ui/InputSearch'
import { useVacancySearchContext } from '@/context/vacancy_search_state'
import InfiniteScroll from 'react-infinite-scroll-component'
import JobCard from '@/components/ui/JobCard'
import Card from '@/components/for_pages/Common/Card'
import Spinner from '@/components/ui/Spinner'
import Spacer from '@/components/ui/Spacer'
import useTranslation from 'next-translate/useTranslation'
import { useAppContext } from '@/context/state'
import { ModalType } from '@/types/enums'
import { IVacancySearchModalProps } from '@/components/modals/SearchFiltersModal'


interface Props {
}

export default function FilteredVacancies(props: Props) {
  const router = useRouter()
  const vacancySearchContext = useVacancySearchContext()
  const appContest = useAppContext()
  const {isTabletWidth} = appContest.size
  const {t} = useTranslation()


  const onSearch = (search: string) => {
    if(vacancySearchContext.filters?.current) {
      vacancySearchContext.filters.current.search = search
      vacancySearchContext.filters.current.page = 1
    }
    vacancySearchContext.setVacancies?.(true)
  }

  const onNext = () => {
    vacancySearchContext.nextPage?.()
  }

  const showOnMapElement = (
    <p className={styles.showOnMap}>{t('jobs_search_show_on_map')}</p>
  )

  const onFilterClick = () => {
    appContest.showModal<IVacancySearchModalProps>(ModalType.SearchFiltersModal, {context: vacancySearchContext})
  }

  return (<div className={styles.root}>
    <div className={styles.titleWrapper}>
    <PageTitle title={t('form_field_search')} invertColors={isTabletWidth} onBack={router.back}/>
    <Spacer basis={16}/>
    {isTabletWidth &&
      <InputSearch searchValue={vacancySearchContext.filters?.current?.search}
      onEnterClick={onSearch} searchRequest={()=>null}
      searchIcon
      placeholder={t('form_field_search')}
      onFilterClick={onFilterClick}
      showFilterButton
      />
    }
    </div>
    {!isTabletWidth &&
      <Card className={styles.card}>
        <InputSearch searchValue={vacancySearchContext.filters?.current?.search}
        onEnterClick={onSearch} searchRequest={()=>null}
        searchIcon
        placeholder={t('form_field_search')}
        />
      </Card>
    }

    <div className={styles.content}>

      <PageTitle title={t('jobs_search_results')} right={showOnMapElement}/>

      <Spacer basis={20}/>

      <InfiniteScroll next={onNext} hasMore={vacancySearchContext?.vacancies?.size < vacancySearchContext?.total}
      loader={<Spinner size={16}/>}
      dataLength={vacancySearchContext?.vacancies?.size}>
        {vacancySearchContext.total === 0 && !vacancySearchContext.loading && <p>No results</p>}
        <div className={styles.vcWrapper}>
          {[...vacancySearchContext.vacancies?.values()].map(el=>{
            return (<JobCard vacancy={el}  onSave={(el)=> vacancySearchContext.saveHandler(el)}/>)
          })}
        </div>
      </InfiniteScroll>
    </div>
  </div>)
}
