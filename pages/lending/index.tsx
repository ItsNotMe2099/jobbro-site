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


export default function LendingPage() {

  const { isPhoneWidth } = useResize()

  return (
    <Layout>
      <HireBest />
      <EmpoweredAI />
      <Item
        btnText='Try now'
        title='Job creation'
        text={<>The platform helps you to form a perfect job advertisement. AI writes descriptions<br />
          the way you want and suggest you key skills and values for any position you have.</>}
        image={isPhoneWidth ? '/lending/job-creation-mobile.png' : '/lending/job-creation-desk.png'}
      />
      <div className={styles.wrapper}>
        <Item
          className={styles.base}
          btnText='Create base'
          title='Every candidate in one place'
          text={<>Every candidate who has ever replied you is saved in our database, so you can easily<br />
            access any of them whenever you want. Now you won&apos;t lose any wonderful addition <br />
            to your team.</>}
          image={isPhoneWidth ? '/lending/every-candidate-mobile.png' : '/lending/every-candidate-desk.png'}
        />
      </div>
      <Happy />
      <OneClick />
      <Item
        btnText='Try now'
        title='Clear view on your recruitment'
        text={<>Get access to all the statistics of your recruitment process, from personal HR metrics<br />
          and hiring flow data to user and candidate satisfaction.</>}
        image={isPhoneWidth ? '/lending/clear-view-mobile.png' : '/lending/clear-view-desk.png'}
      />
      <TryIt />
      <ImproveYourWork />
    </Layout>
  )
}
