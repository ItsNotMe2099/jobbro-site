import styles from './index.module.scss'
import {LkPageHirerLayout} from '@/components/for_pages/Lk/components/LkLayout'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {useState} from 'react'
import classNames from 'classnames'
import {Routes} from '@/types/routes'
import {useRouter} from 'next/router'
import useInterval from 'use-interval'
import Card from '@/components/for_pages/Common/Card'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'
import CloseSvg from '@/components/svg/CloseSvg'
import {CardViewType} from '@/types/enums'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import ViewToggleFilterButton from '@/components/for_pages/Common/FilterToolbar/ViewToggleFilterButton'


const JobPage = () =>  {

  const [view, setView] = useState<CardViewType>(CardViewType.Card)

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
      aiComment: 'This candidate is a great candidate for the position of Senior Manager of Software Development and Engineering.',
      added: true
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
          <PageTitle title={item?.name} link={Routes.lkJobs} />
          <div className={styles.wrapper}>
            <FilterToolbar left={[]} right={<ViewToggleFilterButton onChange={setView} view={view}/>}/>

            <div className={classNames(styles.cards, { [styles.rows]: view === CardViewType.Row })}>
              {/*candidates.map((i, index) =>

                <CandidateCard onAddBookmark={(bookmark) => setBookmark(bookmark)} view={view} className={styles.card} item={i} key={index} />
              )*/}
            </div>
          </div>
        </div>
      </>
  )
}
JobPage.getLayout = LkPageHirerLayout
export default JobPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
