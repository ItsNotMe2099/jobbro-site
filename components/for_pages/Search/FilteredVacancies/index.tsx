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


interface Props {
}

export default function FilteredVacancies(props: Props) {
  const router = useRouter()
  const vacancySearchContext = useVacancySearchContext()
 

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
    <p className={styles.showOnMap}>Show on map</p>
  )

  return (<div className={styles.root}> 
    <PageTitle title={'Search'} onBack={router.back}/>
    <Card className={styles.card}>
      <InputSearch onEnterClick={onSearch} searchRequest={()=>null} searchIcon placeholder='Search'/>
    </Card>

    <PageTitle title={'Results'} right={showOnMapElement}/>

    <Spacer basis={20}/>

    {/*@ts-ignore*/}
    <InfiniteScroll next={onNext} hasMore={vacancySearchContext?.vacancies?.size < vacancySearchContext?.total} 
    loader={<Spinner size={16}/>} 
    /*@ts-ignore*/
    dataLength={vacancySearchContext?.vacancies?.size}>
      <div className={styles.vcWrapper}>
        { /*@ts-ignore*/}
        {[...vacancySearchContext.vacancies?.values()].map(el=>{
          return (<JobCard vacancy={el} />)
        })}
      </div>
    </InfiniteScroll>
  </div>)
}