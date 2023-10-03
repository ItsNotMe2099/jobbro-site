import styles from './index.module.scss'
import LkLayout from '@/components/for_pages/Lk/components/layout'
import Layout from '@/components/layout/Layout'
import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import Filter from '@/components/for_pages/Lk/Jobs/Filter'
import { useState } from 'react'


export default function Jobs() {

  const [view, setView] = useState<'card' | 'row'>('row')

  return (
    <Layout>
      <LkLayout>
        <div className={styles.container}>
          <PageTitle title='Jobs' />
          <div className={styles.wrapper}>
            <Filter view={view} onSetView={() => setView(view === 'card' ? 'row' : 'card')} />
          </div>
        </div>
      </LkLayout>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
