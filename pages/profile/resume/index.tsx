import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { ProfilePageLayout } from '@/components/for_pages/Profile/ProfileLayout'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import Link from 'next/link'
import DropdownMenu from '@/components/ui/DropdownMenu'
interface Props {

}

const ProfileResumePage = (props: Props) => {

  const options = [
    {label: 'Edit'},
    {label: 'Duplicate'},
    {label: 'Hide for hiring'},
    {label: 'Download in PDF'},
    {label: 'Delete'},
  ]

  return (
    <div className={styles.root}>
      <Card>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={styles.title}>Product Designer</div>
            <DropdownMenu options={options}/>
          </div>
          <div className={styles.updated}>
            Update: 05.08.2023 at 6:20 PM
          </div>
          <div className={styles.stats}>
            <div className={styles.item}>
              1 313 jobs
            </div>
            <div className={styles.item}>
              9 impressions
            </div>
            <div className={styles.item}>
              2 invites
            </div>
            <div className={styles.item}>
              0 views
            </div>
          </div>
          <Link className={styles.show} href={''}>
            Show jobs
          </Link>
        </div>
      </Card>
    </div>
  )
}

ProfileResumePage.getLayout = ProfilePageLayout
export default ProfileResumePage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
