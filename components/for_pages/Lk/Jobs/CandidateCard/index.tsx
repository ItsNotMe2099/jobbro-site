import styles from './index.module.scss'
import classNames from 'classnames'
import {MouseEventHandler, useEffect} from 'react'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import UserUtils from '@/utils/UserUtils'
import VacancyUtils from '@/utils/VacancyUtils'
import AvatarCircular from '@/components/ui/AvatarCircular'
import {CardViewType, Goal, ModalType, SidePanelType} from '@/types/enums'
import {JobInviteSidePanelArguments} from '@/types/side_panel_arguments'
import {IOption} from '@/types/types'
import {useCandidateAddedContext} from '@/context/candidate_added_state'
import {useAppContext} from '@/context/state'
import BookmarkSvg from '@/components/svg/BookmarkSvg'
import {colors} from '@/styles/variables'
import MenuButton from '@/components/ui/MenuButton'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import {ICandidate} from '@/data/interfaces/ICandidate'
import useTranslation from 'next-translate/useTranslation'
import Analytics from '@/utils/goals'
import CvCreationTypeBadge from '@/components/ui/CvCreationTypeBadge'
import {HirerRole} from '@/data/enum/HirerRole'
import {runtimeConfig} from '@/config/runtimeConfig'
import Checkbox from '@/components/ui/Checkbox'

enum MenuKey {
  DownloadPdf = 'downloadPdf',
  RemoveFromBase = 'removeFromBase',
  InviteToOtherJob = 'inviteToOtherJob',
  Select = 'select',
  Share = 'share'
}

interface Props {
  candidate: ICandidate
  className?: string
  view: CardViewType
  onSelect: () => void
  isSelected: boolean
  isSelectMode: boolean
}

export default function CandidateCard(props: Props) {

  const appContext = useAppContext()
  const favoriteContext = useCandidateAddedContext()
  const {t} = useTranslation()
  const cv = props.candidate.cv
  useEffect(() => {
    favoriteContext.addRecord(cv!.id)
  }, [])
  const ai = {
    percent: null,
    description: null
  }
  const menuOptions: IOption<MenuKey>[] = [
    {label: t('candidates_base_card_menu_download'), value: MenuKey.DownloadPdf},
    ...(appContext.aboutMe?.hirerRole === HirerRole.Admin ? [{
      label: t('candidates_base_card_menu_remove'),
      value: MenuKey.RemoveFromBase
    }] : []),
    {label: t('candidates_base_card_menu_invite'), value: MenuKey.InviteToOtherJob},
    {label: t('candidates_base_card_menu_select'), value: MenuKey.Select},
    {label: t('candidates_base_card_menu_share'), value: MenuKey.Share},
  ]

  const handleMenuClick = (value: MenuKey) => {
    switch (value) {
      case MenuKey.DownloadPdf:
        Analytics.goal(Goal.CvDownloadPdf)
        window.open(`${runtimeConfig.HOST}/api/cv/${cv!.id}/exportToPdf`, '_blank')

        break
      case MenuKey.RemoveFromBase:
        appContext.showModal(ModalType.Confirm, {
          text: t('confirm_candidate_remove', {name: UserUtils.getName(cv)}),
          onConfirm: async () => {

            favoriteContext.unlike(cv!.id)
            appContext.candidateDeleteState$.next(props.candidate)
            appContext.hideModal()
          }
        } as ConfirmModalArguments)

        break
      case MenuKey.InviteToOtherJob:
        appContext.showSidePanel(SidePanelType.InviteToJob, {cv} as JobInviteSidePanelArguments)
        break
      case MenuKey.Select:
        props.onSelect?.()
        break
      case MenuKey.Share:

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
      <Link href={Routes.lkCandidate(props.candidate.id)} className={styles.container}>
        <BookmarkSvg color={colors.green} className={classNames({
          [styles.bookmark]: true,
        })}/>
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
                {cv.position}
              </div>}
              <div className={styles.salary}>
                {VacancyUtils.formatSalary(cv)}
              </div>
            </div>
          </div>
        </div>
        {props.view !== 'row' && <div className={styles.middle}>
          {cv.title}
        </div>}
        <div className={styles.bottom}>
          {props.view === 'row' && ai.percent != null && <div className={styles.comment}>
            <div className={styles.percent}>
              {ai.percent}
            </div>
            <div className={styles.text}>{ai.description}</div>
          </div>}
          {props.isSelectMode ? <Checkbox style={'circle'} checked={props.isSelected} onClick={handleSelect} /> :
            <MenuButton<MenuKey> options={menuOptions} onClick={handleMenuClick}/>}


        </div>
      </Link>
      {props.view !== 'row' && ai.percent != null && <div className={styles.comment}>
        <div className={styles.percent}>
          {ai.percent}
        </div>
        <div className={styles.text}>{ai.description}</div>
      </div>}
    </div>
  )
}
