
import Search from '@/components/for_pages/Search'
import Layout from '@/components/layout/Layout'
import { IVacancyFilterParams } from '@/data/interfaces/IVacancySearchParams'

interface Props {
  search: string;
  filter: IVacancyFilterParams;
}

export const getServerSideProps = (data: {query: {search: string, filter?: string}}) => {
  return ({
    props: {search: data.query.search||'', filter: data.query.filter?JSON.parse(data.query.filter) as IVacancyFilterParams:{}}
  })
}

export default function SearchPage(props: Props) {

  return (<Layout>
    <Search search={props.search} filter={props.filter}/>
  </Layout>)
}