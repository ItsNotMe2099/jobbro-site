import styles from './index.module.scss'
import Layout from '@/components/layout/Layout'
import ManagerInviteConfirmForm from '@/components/for_pages/Auth/ManagerInviteConfirmForm'
interface Props {
}

export default function ManagerEmailConfirm(props: Props) {
  return <Layout>
    <div className={styles.root}>
      <ManagerInviteConfirmForm/>
    </div>
  </Layout>
}

