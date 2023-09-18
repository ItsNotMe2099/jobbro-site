import FeelingProudSvg from '@/components/svg/FeelingProudSvg'
import styles from './index.module.scss'
import Layout from "@/components/for_pages/layout/Layout"
import LoginForm from '@/components/for_pages/Login/Form'

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
