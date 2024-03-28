import styles from './index.module.scss'
import PageTitle from '@/components/for_pages/Common/PageTitle'
import {ReactElement, useRef} from 'react'
import {Routes} from '@/types/routes'
import {useVacancyOwnerContext} from '@/context/vacancy_owner_state'

import {IOption, Nullable} from '@/types/types'
import PageStickyHeader from '@/components/for_pages/Common/PageStickyHeader'

import Tabs from '@/components/ui/Tabs'
import {useRouter} from 'next/router'
import MenuButton from '@/components/ui/MenuButton'
import {colors} from '@/styles/variables'
import {IShareModalArgs} from '@/components/modals/ShareModal'
import {ModalType} from '@/types/enums'
import {useAppContext} from '@/context/state'
import useTranslation from 'next-translate/useTranslation'

enum MenuKey{
  Show = 'show',
  Edit = 'edit',
  Duplicate = 'duplicate',
  Share = 'share',
  Delete = 'delete'
}

export enum JobPageTabKey{
  Candidates = 'candidates',
  Pipeline = 'pipeline',
  Settings = 'settings'
}
interface Props {
  header?: ReactElement | null,
  children: ReactElement
  activeTab: JobPageTabKey
}

export default function JobPageLayout(props: Props){
  const appContext = useAppContext()
  const router = useRouter()
  const {t} = useTranslation()
  const vacancyOwnerContext = useVacancyOwnerContext()
  const containerRef = useRef<Nullable<HTMLDivElement>>(null)
  const tabs: IOption<JobPageTabKey>[] = [
    {value: JobPageTabKey.Candidates, label: 'Candidates'},
    {value: JobPageTabKey.Pipeline, label: 'Pipeline'},
    {value: JobPageTabKey.Settings, label: 'Settings'},
  ]

  const menuOptions: IOption<MenuKey>[] =  [
    {label: t('job_card_menu_edit'), value: MenuKey.Edit},
    {label: t('job_card_menu_duplicate'), value: MenuKey.Duplicate},
    {label: t('job_card_menu_share'), value: MenuKey.Share},
    {label: t('job_card_menu_delete'), value: MenuKey.Delete, color: colors.textRed},
  ]
  const handleMenuItemClick = (key: MenuKey) => {
    switch (key){
      case MenuKey.Show:
        router.push(Routes.lkJobEdit(vacancyOwnerContext.vacancyId!))
        break
      case MenuKey.Edit:
        router.push(Routes.lkJobEdit(vacancyOwnerContext.vacancyId!))
        break
      case MenuKey.Duplicate:
        router.push(Routes.lkJobClone(vacancyOwnerContext.vacancyId!))
        break
      case MenuKey.Share:
        appContext.showModal<IShareModalArgs>(ModalType.ShareModal, {link: Routes.getGlobal(Routes.job(vacancyOwnerContext.vacancyId!))})
        break
      case MenuKey.Delete:
        vacancyOwnerContext.delete()
        break
    }
  }
  const handleChangeTab = (tab: JobPageTabKey) => {
    switch (tab){
      case JobPageTabKey.Candidates:
        router.replace(Routes.lkJob(vacancyOwnerContext.vacancyId!))
        break
      case JobPageTabKey.Pipeline:
        router.replace(Routes.lkJobPipeline(vacancyOwnerContext.vacancyId!))
        break
      case JobPageTabKey.Settings:
        router.replace(Routes.lkJobSettings(vacancyOwnerContext.vacancyId!))
        break
    }
  }
  return (
      <div className={styles.container} ref={containerRef}>
        <PageStickyHeader boundaryElement={styles.root} formRef={containerRef}>
          <PageTitle title={vacancyOwnerContext.vacancy?.name ?? ''} link={Routes.lkJobs} right={ <MenuButton<MenuKey> options={menuOptions} placement={'bottom-end'} className={styles.menuButton}  onClick={handleMenuItemClick}/>}/>
          <Tabs<JobPageTabKey> options={tabs} value={props.activeTab ?? JobPageTabKey.Candidates} onClick={handleChangeTab}/>
          {props.header ?? <></>}
        </PageStickyHeader>
        {props.children}
      </div>
  )
}
