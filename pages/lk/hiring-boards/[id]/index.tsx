import styles from './index.module.scss'
import { LkPageLayout } from '@/components/for_pages/Lk/components/LkLayout'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import Filter from '@/components/for_pages/Lk/Jobs/Filter'
import { Routes } from '@/types/routes'
import { useRouter } from 'next/router'
import Stages from '@/components/for_pages/Lk/HiringBoards/Stages'


const HiringBoard = () => {

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

  const router = useRouter()

  console.log(router)

  const item = jobs.find(i => i.id.toString() === router.query.id)

  const candidates = [
    { avatar: '/photos/photo1.png', status: 'pre-interview', name: 'Emily Ross', salaryPerHour: '$23 / hr', id: 1 },
    { avatar: '/photos/photo2.png', status: 'pre-interview', name: 'Emily Ross', salaryPerHour: '$23 / hr', id: 2 },
    { avatar: '/photos/photo3.png', status: 'pre-interview', name: 'Emily Ross', salaryPerHour: '$23 / hr', id: 3 },
    { avatar: '/photos/photo1.png', status: 'interview', name: 'Emily Ross', salaryPerHour: '$23 / hr', id: 4 },
    { avatar: '/photos/photo2.png', status: 'awaiting-response', name: 'Emily Ross', salaryPerHour: '$23 / hr', id: 5 },
    { avatar: '/photos/photo1.png', status: 'offer', name: 'Emily Ross', salaryPerHour: '$23 / hr', id: 6 },
    { avatar: '/photos/photo2.png', status: 'offer', name: 'Emily Ross', salaryPerHour: '$23 / hr', id: 7 },
  ]

  const options = [
    'Status', 'Project'
  ]

  return (
    <div className={styles.container}>
      <PageTitle title={item?.name} link={Routes.lkHiringBoards} />
      <div className={styles.wrapper}>
        <Filter options={options} />
        <Stages candidates={candidates} />
      </div>
    </div>
  )
}
HiringBoard.getLayout = LkPageLayout
export default HiringBoard
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
