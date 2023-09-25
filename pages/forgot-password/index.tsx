import ForgotPasswordForm from '@/components/for_pages/ForgotPassword/Form'
import styles from './index.module.scss'
import Layout from "@/components/for_pages/layout/Layout"
import FeelingProudSvg from '@/components/svg/FeelingProudSvg'
import ServerClusterSvg from '@/components/svg/ServerClusterSvg'
import { useState } from 'react'
import CardAuth from '@/components/for_pages/Common/CardAuth'

export default function ForgotPassword() {

  const [success, setSuccess] = useState<boolean>(false)

  return (
    <Layout>
      <div className={styles.root}>
        {!success ?
          <>
            <ForgotPasswordForm />
            <FeelingProudSvg className={styles.proud} />
          </>
          :
          <>
            <CardAuth
              title='Reset pessword'
              text='We sended instruction for reset password to your entered email '
              btnText='Complete'
            />
            <ServerClusterSvg className={styles.proud} />
          </>}
      </div>
    </Layout>
  )
}