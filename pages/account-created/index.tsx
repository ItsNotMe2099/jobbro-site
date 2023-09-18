import Card from '@/components/for_pages/AccountCreated'
import styles from './index.module.scss'
import Layout from "@/components/for_pages/layout/Layout"
import ServerClusterSvg from '@/components/svg/ServerClusterSvg'

export default function AccountCreated() {
  return (
    <Layout>
      <div className={styles.root}>
        <Card />
        <ServerClusterSvg className={styles.cluster} />
      </div>
    </Layout>
  )
}
