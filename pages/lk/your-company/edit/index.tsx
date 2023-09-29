import PageTitle from '@/components/for_pages/Common/PageTitle'
import styles from './index.module.scss'
import LkLayout from '@/components/for_pages/Lk/components/layout'
import Layout from '@/components/for_pages/layout/Layout'
import { Routes } from '@/types/routes'
import EditForm from '@/components/for_pages/Lk/YourCompany/Form/Forms/EditForm'


export default function YourCompanyEdit() {

  return (
    <Layout>
      <LkLayout>
        <div className={styles.container}>
          <PageTitle link={Routes.lkYourCompany} title='Edit office' />
          <EditForm />
        </div>
      </LkLayout>
    </Layout>
  )
}
