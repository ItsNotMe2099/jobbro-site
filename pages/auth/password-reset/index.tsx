import styles from './index.module.scss'
import Layout from '@/components/layout/Layout'
import ServerClusterSvg from '@/components/svg/ServerClusterSvg'
import ResetPasswordForm from '@/components/for_pages/Auth/ResetPasswordForm'
import {useRouter} from 'next/router'

export default function ResetPassword() {
  const router = useRouter()
  const code = router.query.code as string
  const login = router.query.login as string
  return (
    <Layout>
      <div className={styles.root}>
        <ResetPasswordForm code={code} login={login} />
        <ServerClusterSvg className={styles.proud} />
      </div>
    </Layout>
  )
}
