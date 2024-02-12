import styles from './index.module.scss'

import ForgotPasswordForm from '@/components/for_pages/Auth/ForgotPasswordForm'
import Layout from '@/components/layout/Layout'
import FeelingProudSvg from '@/components/svg/FeelingProudSvg'
import ServerClusterSvg from '@/components/svg/ServerClusterSvg'
import { useState } from 'react'
import CardAuth from '@/components/for_pages/Common/CardAuth'
import useTranslation from 'next-translate/useTranslation'
import {Routes} from '@/types/routes'

export default function ForgotPassword() {
  const { t } = useTranslation()
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
              title={t('password_forgot_success_title')}
              text={t('password_forgot_success_desc')}
              btnText={t('password_forgot_success_button')}
              btnHref={Routes.login()}
            />
            <ServerClusterSvg className={styles.proud} />
          </>}
      </div>
    </Layout>
  )
}
