//import styles from './index.module.scss'
import EmpoweredAI from '@/components/for_pages/Lending/EmpoweredAI'
import Happy from '@/components/for_pages/Lending/Happy'
import HireBest from '@/components/for_pages/Lending/HireBest'
import ImproveYourWork from '@/components/for_pages/Lending/ImproveYourWork'
import Item from '@/components/for_pages/Lending/Item'
import OneClick from '@/components/for_pages/Lending/OneClick'
import TryIt from '@/components/for_pages/Lending/TryIt'
import Layout from '@/components/for_pages/Lending/layout/Layout'


export default function LendingPage() {

  return (
    <Layout>
      <HireBest />
      <EmpoweredAI />
      <Item
        btnText='Try now'
        title='Job creation'
        text={<>The platform helps you to form a perfect job advertisement. AI writes descriptions<br />
          the way you want and suggest you key skills and values for any position you have.</>}
        image={'/lending/job-creation.png'}
      />
      <Happy />
      <OneClick />
      <Item
        btnText='Try now'
        title='Clear view on your recruitment'
        text={<>Get access to all the statistics of your recruitment process, from personal HR metrics<br />
          and hiring flow data to user and candidate satisfaction.</>}
        image={'/lending/clearview.png'}
      />
      <TryIt />
      <ImproveYourWork />
    </Layout>
  )
}
