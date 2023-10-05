import { ReactElement } from 'react'
import Header from 'components/layout/Header'
import styles from 'components/layout/Layout/index.module.scss'
import Footer from 'components/layout/Footer'
import { useAppContext } from '@/context/state'
import { SidePanelType } from '@/types/enums'
import SidePanel from './SidePanel'
import FilterForm from '@/components/for_pages/Lk/Jobs/FilterForm'

interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Layout(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      {appContext.sidePanel === SidePanelType.JobsFilter &&
        <SidePanel content={<FilterForm />} className={styles.panel} title={appContext.panelArguments} />}
      <Header />
      <div className={styles.container}>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}
