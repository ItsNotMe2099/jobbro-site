import styles from './index.module.scss'
import classNames from 'classnames'
import {MouseEventHandler, useEffect, useState} from 'react'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import UserUtils from '@/utils/UserUtils'
import VacancyUtils from '@/utils/VacancyUtils'
import AvatarCircular from '@/components/ui/AvatarCircular'
import {ICVWithApply} from '@/data/interfaces/ICV'
import {CardViewType, Goal, SidePanelType} from '@/types/enums'
import CvFavoriteBtn from '@/components/for_pages/Common/CvFavoriteBtn'
import JobApplyStatus from '@/components/for_pages/Lk/Jobs/JobApplyCard/JobApplyStatus'
import {ApplyCvWrapper, useApplyCvContext} from '@/context/apply_cv_state'
import MenuButton from '@/components/ui/MenuButton'
import {IOption} from '@/types/types'
import {useCandidateAddedContext} from '@/context/candidate_added_state'
import {useAppContext} from '@/context/state'
import {JobInviteSidePanelArguments} from '@/types/side_panel_arguments'
import {useCvEvaluationContext} from '@/context/cv_evaluation_state'
import useTranslation from 'next-translate/useTranslation'
import Analytics from '@/utils/goals'
import CvCreationTypeBadge from '@/components/ui/CvCreationTypeBadge'
import {runtimeConfig} from '@/config/runtimeConfig'
import Checkbox from '@/components/ui/Checkbox'
import {NotificationUnreadType} from '@/data/interfaces/INotification'
import {useNotificationContext} from '@/context/notifications_state'
import ImageHelper from '@/utils/ImageHelper'
import showToast from '@/utils/showToast'

enum MenuKey{
  DownloadPdf = 'downloadPdf',
  DownloadOriginalPdf = 'downloadOriginalPdf',
  AddToBase = 'addToBase',
  InviteToOtherJob = 'inviteToOtherJob',
  Select = 'select',
  Share = 'share'
}
interface Props {
  cv: ICVWithApply
  className?: string
  view: CardViewType
  onSelect: () => void
  isSelected: boolean
  isSelectMode: boolean
}

const JobApplyCardInner = (props: Props) => {
  const [bookmark, setBookmark] = useState<boolean>(false)
  const applyCvContext = useApplyCvContext()
  const favoriteContext = useCandidateAddedContext()
  const cvEvaluationContext = useCvEvaluationContext()
  const notifyContext = useNotificationContext()
  const { t } = useTranslation()
  const evaluation = cvEvaluationContext.store[`${applyCvContext.cv!.id}:${applyCvContext.apply!.vacancyId!}`]?.evaluation
  const cv = applyCvContext.cv!
  const appContext = useAppContext()
  const active = props.cv.applications.length > 0 ? notifyContext.store[NotificationUnreadType.application].find(i => i.eId === props.cv.applications[0].id) : (props.cv.applications.length > 0 ? notifyContext.store[NotificationUnreadType.proposal].find(i => i.eId === props.cv.proposals[0].id)  : false)
  useEffect(() => {
    if(props.cv.applications.length > 0){
      console.log('AddRecord11')
      notifyContext.addRecord(props.cv.applications[0].id, NotificationUnreadType.application)
      return () => {
        console.log('AddRecord12')
        notifyContext.removeRecord(props.cv.applications[0].id, NotificationUnreadType.application)
      }
    }else if(props.cv.proposals.length > 0){
      notifyContext.addRecord(props.cv.proposals[0].id, NotificationUnreadType.proposal)
      return () => {
        notifyContext.removeRecord(props.cv.proposals[0].id, NotificationUnreadType.proposal)
      }
    }
  }, [])
  useEffect(() => {
    if (active) {
      if(props.cv.applications.length > 0){
        notifyContext.markRead(props.cv.applications[0].id, NotificationUnreadType.application, false)
      }else if(props.cv.proposals.length > 0){
        notifyContext.markRead(props.cv.proposals[0].id, NotificationUnreadType.proposal, false)
      }

    }
  }, [active])
  const ai = {
    percent: null,
    description: null
  }
  useEffect(() => {
    favoriteContext.addRecord(applyCvContext.cv!.id)
    cvEvaluationContext.addRecord(applyCvContext.cv!.id, applyCvContext.apply!.vacancyId!)
    return () => {

      cvEvaluationContext.removeRecord(applyCvContext.cv!.id, applyCvContext.apply!.vacancyId!)
    }
  }, [])

  useEffect(() => {
    const subscriptionFavoriteRefresh = favoriteContext.refreshState$.subscribe((cv) => {
      favoriteContext.addRecord(applyCvContext.cv!.id)
    })

    return () => {
      subscriptionFavoriteRefresh.unsubscribe()
    }
  }, [])

  const menuOptions: IOption<MenuKey>[] = [
    {label: t('apply_card_menu_download'), value: MenuKey.DownloadPdf},
    ...(cv.file ? [{label: t('apply_card_menu_download_original'), value: MenuKey.DownloadOriginalPdf}] : []),
    {label: t('apply_card_menu_add_to_base'), value: MenuKey.AddToBase},
    {label: t('apply_card_menu_invite'), value: MenuKey.InviteToOtherJob},
    {label: t('apply_card_menu_select'), value: MenuKey.Select},
    {label: t('apply_card_menu_share'), value: MenuKey.Share},
  ]

  const handleMenuClick = (value: MenuKey) => {
    switch (value){
      case MenuKey.DownloadPdf:
        Analytics.goal(Goal.CvDownloadPdf)
        window.open(`${runtimeConfig.HOST}/api/cv/${cv!.id}/exportToPdf`, '_blank')
        break
      case MenuKey.DownloadOriginalPdf:
        window.open(`${ImageHelper.urlFromFile(cv.file)}`, '_blank')
        break
      case MenuKey.AddToBase:
        favoriteContext.like(cv!.id)
        break
      case MenuKey.InviteToOtherJob:
        appContext.showSidePanel(SidePanelType.InviteToJob, { cv } as JobInviteSidePanelArguments)
        break
      case MenuKey.Select:
        props.onSelect?.()
        break
      case MenuKey.Share:
         navigator.clipboard.writeText( Routes.getGlobal(Routes.lkJobCv(applyCvContext.apply!.vacancyId!, cv.id)))
         showToast({title: t('toast_cv_share_copied_link')})
        break
    }
  }
  const handleSelect: MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    props.onSelect?.()
  }
  return (
    <div className={classNames(styles.root, props.className, {[styles.row]: props.view === CardViewType.Row})}>
      <div className={classNames(styles.selected, {[styles.selectedActive]: props.isSelected})}/>

      <CvFavoriteBtn id={cv.id}  className={styles.bookmark}/>
      <Link href={Routes.lkJobCv(applyCvContext.apply!.vacancyId!, cv.id)} className={styles.container}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <AvatarCircular file={cv.image ?? cv?.profile?.image}/>
            <CvCreationTypeBadge isFile={!cv.profileId}/>
          </div>
          <div className={styles.right}>
            <div className={styles.name}>
              {UserUtils.getName(cv)}
            </div>
            <div className={styles.forRow}>
              {props.view === 'row' && <div className={styles.middle}>
                {cv.title ?? cv.position}
              </div>}
              <div className={styles.salary}>
                {VacancyUtils.formatSalary(cv)}
              </div>
            </div>
          </div>
        </div>
        {props.view !== 'row' && <div className={styles.middle}>
          {cv.title ?? cv.position}
        </div>}
        <div className={styles.bottom}>
          {props.view === 'row' &&  !!evaluation  && <div className={styles.cvEvaluation}>
            <div className={styles.percent}>
              {evaluation.percentEvaluation}%
            </div>
            <div className={styles.text}>{ai.description}</div>
          </div>}
          <div className={styles.status}>
           <JobApplyStatus cv={props.cv}/>
          </div>

          {props.isSelectMode ? <Checkbox style={'circle'} checked={props.isSelected} onClick={handleSelect} /> : <MenuButton<MenuKey> options={menuOptions} onClick={handleMenuClick}/>}

        </div>
      </Link>
      {props.view !== 'row' && !!evaluation  && <div className={styles.cvEvaluation}>
        <div className={styles.percent}>
          {evaluation.percentEvaluation}%
        </div>
        <div title={evaluation.justification||''} className={styles.text}>{evaluation.justification}</div>
      </div>}
    </div>
  )
}

export default function JobApplyCard(props: Props) {
  return <ApplyCvWrapper cv={props.cv} >
    <JobApplyCardInner {...props}/>
  </ApplyCvWrapper>
}
