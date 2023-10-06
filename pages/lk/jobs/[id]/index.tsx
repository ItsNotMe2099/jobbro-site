import styles from './index.module.scss'
import LkLayout from '@/components/for_pages/Lk/components/layout'
import Layout from '@/components/layout/Layout'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import Filter from '@/components/for_pages/Lk/Jobs/Filter'
import { useState } from 'react'
import classNames from 'classnames'
import { Routes } from '@/types/routes'
import { useRouter } from 'next/router'
import CandidateCard from '@/components/for_pages/Lk/Jobs/CandidateCard'


export default function Job() {

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

  const router = useRouter()

  console.log(router)

  const item = data.find(i => i.id.toString() === router.query.id)

  const candidates = [
    {
      avatar: '/photos/Photo1.png',
      firstName: 'Emily', lastName: 'Ross', salary: '$38 / hr', position: 'Senior Python Development', percent: '80%',
      status: 'Invited',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.'
    },
    {
      avatar: '/photos/Photo2.png',
      firstName: 'Lynn', lastName: 'Wolfsmith-Grandelglokershenfelder',
      salary: '$26 / hr', position: 'Senior Manager of Software Development and Engineering', percent: '80%',
      status: 'Invited',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.'
    },
    {
      avatar: '/photos/Photo3.png',
      firstName: 'Noah', lastName: 'Clark',
      salary: '$26 / hr', position: 'Middle Backend Development', percent: '80%',
      status: 'Invited',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.'
    },
    {
      avatar: '/photos/Photo4.png',
      firstName: 'Josef', lastName: 'Poletski',
      salary: '$8 / hr', position: 'Senior Python Development', percent: '80%',
      status: 'Invited',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.'
    },
    {
      avatar: '/photos/Photo5.png',
      firstName: 'Josef', lastName: 'Poletski',
      salary: '$8 / hr', position: 'Senior Python Development', percent: '80%',
      status: 'Invited',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.'
    },
  ]

  return (
    <Layout>
      <LkLayout>
        <div className={styles.container}>
          <PageTitle title={item?.name} link={Routes.lkJobs} />
          <div className={styles.wrapper}>
            <Filter view={view} onSetView={() => setView(view === 'card' ? 'row' : 'card')} />
            <div className={classNames(styles.cards, { [styles.rows]: view === 'row' })}>
              {candidates.map((i, index) =>
                <CandidateCard view={view} className={styles.card} item={i} key={index} />
              )}
            </div>
          </div>
        </div>
      </LkLayout>
    </Layout >
  )
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
