import styles from './index.module.scss'
import Layout from "@/components/for_pages/layout/Layout"
import ServerClusterSvg from '@/components/svg/ServerClusterSvg'
import ResetPasswordForm from '@/components/for_pages/ResetPassword/Form'

export default function ResetPassword() {

  return (
    <Layout>
      <div className={styles.root}>
        <ResetPasswordForm />
        <ServerClusterSvg className={styles.proud} />
      </div>
    </Layout>
  )
}
