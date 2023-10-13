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
import useInterval from 'use-interval'
import Card from '@/components/for_pages/Common/Card'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'
import CloseSvg from '@/components/svg/CloseSvg'


export default function Candidate() {

  const [view, setView] = useState<'card' | 'row'>('card')

  const router = useRouter()

  console.log(router)

  const candidates = [
    {
      avatar: '/photos/Photo1.png',
      firstName: 'Emily', lastName: 'Ross', salary: '$38 / hr', position: 'Senior Python Development', percent: '80%',
      status: 'Invited',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.',
      added: true, id: 1
    },
    {
      avatar: '/photos/Photo2.png',
      firstName: 'Lynn', lastName: 'Wolfsmith-Grandelglokershenfelder',
      salary: '$26 / hr', position: 'Senior Manager of Software Development and Engineering', percent: '80%',
      status: 'Invited',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.', id: 2
    },
    {
      avatar: '/photos/Photo3.png',
      firstName: 'Noah', lastName: 'Clark',
      salary: '$26 / hr', position: 'Middle Backend Development', percent: '80%',
      status: 'Invited',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.', id: 3
    },
    {
      avatar: '/photos/Photo4.png',
      firstName: 'Josef', lastName: 'Poletski',
      salary: '$8 / hr', position: 'Senior Python Development', percent: '80%',
      status: 'Invited',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.', id: 4
    },
    {
      avatar: '/photos/Photo5.png',
      firstName: 'Josef', lastName: 'Poletski',
      salary: '$8 / hr', position: 'Senior Python Development', percent: '80%',
      status: 'Invited',
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.', id: 5
    },
  ]

  const item = candidates.find(i => i.id.toString() === router.query.id)

  const [bookmark, setBookmark] = useState<boolean>(false)

  const handleBookmark = () => {

  }

  useInterval(() => {
    if (bookmark) {
      setBookmark(false)
    }
  }, 5000)

  return (
    <Layout>
      {bookmark ?
        <Card className={styles.notification} title={''}>
          <div className={styles.inner}>
            <div className={styles.checkbox}>
              <CheckBoxSvg className={styles.check} />
            </div>
            <div className={styles.content}>
              <div className={styles.top}>
                Candidate added
              </div>
              <div className={styles.bottom}>
                You can find him on candidate<br /> base
              </div>
            </div>
            <div className={styles.closebox}>
              <CloseSvg className={styles.close} onClick={() => setBookmark(false)} color='#939393' />
            </div>
          </div>
        </Card>
        : <></>}
      <LkLayout>
        <div className={styles.container}>
          <PageTitle title={item?.position as string} link={Routes.lkCandidatesBase} />
          <div className={styles.wrapper}>

          </div>
        </div>
      </LkLayout>
    </Layout >
  )
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
