import styles from './index.module.scss'
import LkLayout from '@/components/for_pages/Lk/components/layout'
import Layout from '@/components/layout/Layout'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import Filter from '@/components/for_pages/Lk/Jobs/Filter'
import { useState } from 'react'
import JobCard from '@/components/for_pages/Lk/Jobs/JobCard'
import Add from '@/components/for_pages/Common/Add'
import MenuOptions from '@/components/for_pages/Common/MenuOptions'
import classNames from 'classnames'
import SortDropdown from '@/components/for_pages/Lk/Jobs/Filter/SortDropdown'


export default function Jobs() {

  const [view, setView] = useState<'card' | 'row'>('card')

  const data: any[] = [
    {
      published: '25 Jun 2023', employees: 86, name: 'Senior Manager of Software Development and Engineering',
      status: 'draft', salary: '$15 / hr', country: 'Indonesia', id: 1
    },
    {
      published: '25 Jun 2023', employees: 86, name: 'Junior Java Development',
      status: 'published', salary: '$25 / hr', country: 'India', id: 2
    },
    {
      published: '25 Jun 2023', employees: 86, name: 'Senior Back-end Development with Python Skills',
      status: 'published', salary: '$23 / hr', country: 'Indonesia', id: 3
    },
    {
      published: '25 Jun 2023', employees: 86, name: 'Product Designer',
      status: 'published', salary: '$21 / hr', country: 'Indonesia', id: 4
    },
    {
      published: '25 Jun 2023', employees: 86, name: 'Graphic Designer',
      status: 'pause', salary: '$35 / hr', country: 'Canada', id: 5
    },
  ]

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const [showSort, setShowSort] = useState<boolean>(false)

  const sortOptions = [
    { label: 'From New to Old', value: 'From New to Old' },
    { label: 'From Old to New', value: 'From Old to New' },
    { label: 'Low to High Salary', value: 'Low to High Salary' },
    { label: 'High to Low Salary', value: 'High to Low Salary' },
  ]

  const [sort, setSort] = useState<string>('')

  return (
    <Layout>
      <LkLayout>
        <div className={styles.container}>
          <PageTitle title='Jobs' />
          <div className={styles.wrapper}>
            <Filter showChild={() => setShowSort(!showSort)}
              view={view} onSetView={() => setView(view === 'card' ? 'row' : 'card')}>
              {showSort ? <SortDropdown className={styles.sort} options={sortOptions} val={sort} setVal={(val) => setSort(val as string)} /> : <></>}
            </Filter>
            <div className={classNames(styles.cards, { [styles.rows]: view === 'row' })}>
              {data.map((i, index) =>
                <JobCard view={view} className={styles.card} item={i} key={index} />
              )}
              <div className={styles.plus}>
                {showMenu ? <MenuOptions className={styles.menu} /> : <></>}
                <Add active={showMenu} onClick={() => setShowMenu(!showMenu)} />
              </div>
            </div>
          </div>
        </div>
      </LkLayout>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
