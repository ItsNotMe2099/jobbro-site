import FeelingProudSvg from '@/components/svg/FeelingProudSvg'
import styles from './index.module.scss'
import Layout from "@/components/for_pages/layout/Layout"
import RegistrationForm from '@/components/for_pages/Registration/Form'

export default function Registration() {
  return (
    <Layout>
      <div className={styles.root}>
        <RegistrationForm />
        <div className={styles.proud}>
          <FeelingProudSvg />
        </div>
      </div>
    </Layout>
  )
}
