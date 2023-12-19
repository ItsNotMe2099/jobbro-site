import styles from './index.module.scss'
import classNames from 'classnames'
import {useEffect} from 'react'
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
import Analytics from '@/utils/goals'

enum MenuKey{
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
}

export default function CandidateCard(props: Props) {

  const appContext = useAppContext()
  const favoriteContext = useCandidateAddedContext()
const cv = props.candidate.cv
  useEffect(() => {
    favoriteContext.addRecord(cv!.id)
  }, [])
  const ai = {
    percent: null,
    description: null
  }
  const menuOptions: IOption<MenuKey>[] = [
    {label: 'Download resume in PDF', value: MenuKey.DownloadPdf},
    {label: 'Remove from base', value: MenuKey.RemoveFromBase},
    {label: 'Invite', value: MenuKey.InviteToOtherJob},
    {label: 'Select', value: MenuKey.Select},
    {label: 'Share', value: MenuKey.Share},
  ]

  const handleMenuClick = (value: MenuKey) => {
    switch (value){
      case MenuKey.DownloadPdf:
        Analytics.goal(Goal.CvDownloadPdf)
        break
      case MenuKey.RemoveFromBase:
        appContext.showModal(ModalType.Confirm, {
          text: `Are you sure that you want to remove candidate «${UserUtils.getName(cv)}» from base?`,
          onConfirm: async () => {

            favoriteContext.unlike(cv!.id)
            appContext.candidateDeleteState$.next(props.candidate)
            appContext.hideModal()
          }
        } as ConfirmModalArguments)

        break
      case MenuKey.InviteToOtherJob:
        appContext.showSidePanel(SidePanelType.InviteToJob, { cv } as JobInviteSidePanelArguments)
        break
      case MenuKey.Select:

        break
      case MenuKey.Share:

        break
    }
  }
  return (
    <div className={classNames(styles.root, props.className, { [styles.row]: props.view === CardViewType.Row })}>
      <Link href={Routes.lkCandidate(props.candidate.id)} className={styles.container}>
        <BookmarkSvg color={colors.green} className={classNames({
          [styles.bookmark]: true,
        })}/>
        <div className={styles.top}>
          <AvatarCircular file={cv.image ?? cv?.profile?.image}/>
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
          <MenuButton<MenuKey> options={menuOptions} onClick={handleMenuClick}/>

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
