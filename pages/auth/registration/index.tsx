import FeelingProudSvg from '@/components/svg/FeelingProudSvg'
import styles from 'pages/auth/registration/index.module.scss'
import Layout from '@/components/layout/Layout'
import RegistrationForm from '@/components/for_pages/Auth/RegistrationForm'
import { useState } from 'react'
import CardAuth from '@/components/for_pages/Common/CardAuth'
import ServerClusterSvg from '@/components/svg/ServerClusterSvg'
import useTranslation from 'next-translate/useTranslation'

export default function Registration() {
  const { t } = useTranslation()
  const [success, setSuccess] = useState<boolean>(false)

  return (
    <Layout>
      <div className={styles.root}>
        {!success ?
          <>
            <RegistrationForm onSubmit={() => setSuccess(true)}/>
            <FeelingProudSvg className={styles.proud} />
          </>
          :
          <>
            <CardAuth
              title={t('registration_success_title')}
              text={t('registration_success_desc')}
              btnText={t('registration_success_button')}
              btnHref={'/'}
            />
            <ServerClusterSvg className={styles.proud} />
          </>}
      </div>
    </Layout>
  )
}
