import styles from './index.module.scss'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkPageLayout } from '@/components/for_pages/Lk/components/LkLayout'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import Filter from '@/components/for_pages/Lk/Jobs/Filter'
import JobCard from '@/components/for_pages/Lk/HiringBoards/JobCard'
import Link from 'next/link'
import { Routes } from '@/types/routes'

const options = [
  'Status', 'Project'
]

const jobs: any[] = [
  {
    name: 'Senior Manager of Software Development and Engineering', id: 1
  },
  {
    name: 'Junior Java Development', id: 2
  },
  {
    name: 'Senior Back-end Development with Python Skills', id: 3
  },
  {
    name: 'Product Designer', id: 4
  },
  {
    name: 'Graphic Designer', id: 5
  },
]


const HiringBoards = () => {
  return (
    <div className={styles.container}>
      <PageTitle title={'Hiring boards'} />
      <div className={styles.wrapper}>
        <Filter options={options} />
        <div className={styles.cards}>
          {jobs.map((i, index) =>
            <Link href={Routes.lkHiringBoard(i.id)}>
              <JobCard item={i} key={index} />
            </Link>)
          }
        </div>
      </div>
    </div>
  )
}
HiringBoards.getLayout = LkPageLayout

export default HiringBoards
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
