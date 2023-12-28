import styles from './index.module.scss'
import EmpoweredAI from '@/components/for_pages/Lending/EmpoweredAI'
import Happy from '@/components/for_pages/Lending/Happy'
import HireBest from '@/components/for_pages/Lending/HireBest'
import ImproveYourWork from '@/components/for_pages/Lending/ImproveYourWork'
import Item from '@/components/for_pages/Lending/Item'
import OneClick from '@/components/for_pages/Lending/OneClick'
import TryIt from '@/components/for_pages/Lending/TryIt'
import Layout from '@/components/for_pages/Lending/layout/Layout'
import { useResize } from '@/components/hooks/useResize'
import useTranslation from 'next-translate/useTranslation'


export default function LendingPage() {
  const { t } = useTranslation()
  const { isPhoneWidth } = useResize()

  return (
    <Layout>
      <HireBest />
      <EmpoweredAI />
      <Item
        btnText={t('main_lending_job_creation_button')}
        title={t('main_lending_job_creation_title')}
        text={t('main_lending_job_creation_desc')}
        image={isPhoneWidth ? '/lending/job-creation-mobile.png' : '/lending/job-creation-desk.png'}
      />
      <div className={styles.wrapper}>
        <Item
          className={styles.base}
          classBtn={styles.creationBtn}
          btnText={t('main_lending_base_creation_button')}
          title={t('main_lending_base_creation_title')}
          text={t('main_lending_base_creation_desc')}
          image={isPhoneWidth ? '/lending/every-candidate-mobile.png' : '/lending/every-candidate-desk.png'}
        />
      </div>
      <Happy />
      <OneClick />
      <Item
        btnText={t('main_lending_clear_view_button')}
        classImg={styles.clear}
        title={t('main_lending_clear_view_title')}
        text={t('main_lending_clear_view_desc')}
        image={isPhoneWidth ? '/lending/clear-view-mobile.png' : '/lending/clear-view-desk.png'}
      />
      <TryIt />
      <ImproveYourWork />
    </Layout>
  )
}
