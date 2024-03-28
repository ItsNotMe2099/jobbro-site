import styles from './index.module.scss'
import {getAuthServerSideProps} from '@/utils/auth'
import {ProfileType} from '@/data/enum/ProfileType'
import {useRouter} from 'next/router'
import FilterToolbar from '@/components/for_pages/Common/FilterToolbar'
import dynamic from 'next/dynamic'
import {useState} from 'react'
import {LkJobHirerLayout} from '@/components/for_pages/Lk/Job/LkJobLayout'
import JobPageLayout, {JobPageTabKey} from '@/components/for_pages/Lk/Job/JobPageLayout'

const HiringBoard = dynamic(() => import('@/components/for_pages/Lk/HiringBoards/HiringBoard'), {
  ssr: false,
})

const JobPipelinePage = () => {
  const router = useRouter()
  const vacancyId = parseInt(router.query.id as string, 10)
  const [isEdit, setIsEdit] = useState(false)
  return (
    <JobPageLayout header={ <FilterToolbar />} activeTab={JobPageTabKey.Pipeline}>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <HiringBoard vacancyId={vacancyId} isEdit={isEdit}/>
      </div>
    </div>
    </JobPageLayout>
  )
}


JobPipelinePage.getLayout = LkJobHirerLayout
export default JobPipelinePage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
