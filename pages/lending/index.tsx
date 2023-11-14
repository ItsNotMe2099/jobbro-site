//import styles from './index.module.scss'
import EmpoweredAI from '@/components/for_pages/Lending/EmpoweredAI'
import HireBest from '@/components/for_pages/Lending/HireBest'
import ImproveYourWork from '@/components/for_pages/Lending/ImproveYourWork'
import Layout from '@/components/for_pages/Lending/layout/Layout'


export default function LendingPage() {

  return (
    <Layout>
      <HireBest />
      <EmpoweredAI />
      <ImproveYourWork />
    </Layout>
  )
}
