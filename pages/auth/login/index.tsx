import styles from './index.module.scss'

import FeelingProudSvg from '@/components/svg/FeelingProudSvg'
import Layout from '@/components/layout/Layout'
import LoginForm from '@/components/for_pages/Auth/LoginForm'

export default function Login() {
  return (
    <Layout>
      <div className={styles.root}>
        <LoginForm />
        <div className={styles.proud}>
          <FeelingProudSvg />
        </div>
      </div>
    </Layout>
  )
}
