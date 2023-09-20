import FeelingProudSvg from '@/components/svg/FeelingProudSvg'
import styles from './index.module.scss'
import Layout from "@/components/for_pages/layout/Layout"
import RegistrationForm from '@/components/for_pages/Registration/Form'
import { useState } from 'react'
import CardAuth from '@/components/for_pages/Common/CardAuth'
import ServerClusterSvg from '@/components/svg/ServerClusterSvg'

export default function Registration() {

  const [success, setSuccess] = useState<boolean>(false)

  return (
    <Layout>
      <div className={styles.root}>
        {!success ?
          <>
            <RegistrationForm />
            <FeelingProudSvg className={styles.proud} />
          </>
          :
          <>
            <CardAuth
              title='Account created'
              text='We was send message to your email with link for confirm email address. Link will be actuality 12 hours.'
              btnText='Okey'
            />
            <ServerClusterSvg className={styles.proud} />
          </>}
      </div>
    </Layout>
  )
}
