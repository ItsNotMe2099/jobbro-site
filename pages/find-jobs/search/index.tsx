
import Search from '@/components/for_pages/Search'
import Layout from '@/components/layout/Layout'
import { VacancySearchWrapper } from '@/context/vacancy_search_state'
import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'

interface Props {
  filter: IVacancyFilterParams;
}

export const getServerSideProps = (data: {query: {search: string, filter?: string}}) => {
  return ({
    props: {filter: data.query.filter?JSON.parse(data.query.filter) as IVacancyFilterParams:{}}
  })
}

export default function SearchPage(props: Props) {

  return (<Layout>
    <VacancySearchWrapper filters={props.filter}>
      <Search search={props.filter.search||''} filter={props.filter}/>
    </VacancySearchWrapper>
  </Layout>)
}