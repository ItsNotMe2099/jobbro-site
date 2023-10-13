import styles from './index.module.scss'
import {LkPageLayout} from '@/components/for_pages/Lk/components/LkLayout'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import { useState } from 'react'
import { Routes } from '@/types/routes'
import { useRouter } from 'next/router'
import useInterval from 'use-interval'
import Card from '@/components/for_pages/Common/Card'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'
import CloseSvg from '@/components/svg/CloseSvg'

const CandidatePage = () => {

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
    <>
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

        <div className={styles.container}>
          <PageTitle title={item?.position as string} link={Routes.lkCandidatesBase} />
          <div className={styles.wrapper}>

          </div>
        </div>
    </>
  )
}
CandidatePage.getLayout = LkPageLayout
export default  CandidatePage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
