import ForgotPasswordForm from '@/components/for_pages/Auth/ForgotPasswordForm'
import styles from './index.module.scss'
import Layout from '@/components/layout/Layout'
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
            <ForgotPasswordForm onSubmit={() => setSuccess(true)}/>
            <FeelingProudSvg className={styles.proud} />
          </>
          :
          <>
            <CardAuth
              title='Reset password'
              text='We sent instruction for reset password to your entered email '
              btnText='Complete'
            />
            <ServerClusterSvg className={styles.proud} />
          </>}
      </div>
    </Layout>
  )
}
