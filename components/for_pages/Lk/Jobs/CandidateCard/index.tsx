import styles from './index.module.scss'
import classNames from 'classnames'
import {useEffect} from 'react'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import UserUtils from '@/utils/UserUtils'
import VacancyUtils from '@/utils/VacancyUtils'
import AvatarCircular from '@/components/ui/AvatarCircular'
import {CardViewType, ModalType, SidePanelType} from '@/types/enums'
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
  const { t } = useTranslation()
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
    {label: t('candidates_base_card_menu_remove'), value: MenuKey.RemoveFromBase},
    {label: t('candidates_base_card_menu_invite'), value: MenuKey.InviteToOtherJob},
    {label: t('candidates_base_card_menu_select'), value: MenuKey.Select},
    {label: t('candidates_base_card_menu_share'), value: MenuKey.Share},
  ]

  const handleMenuClick = (value: MenuKey) => {
    switch (value){
      case MenuKey.DownloadPdf:

        break
      case MenuKey.RemoveFromBase:
        appContext.showModal(ModalType.Confirm, {
          text: t('candidates_base_card_remove_confirm', {name: UserUtils.getName(cv)}),
          onConfirm: async () => {
            favoriteContext.unlike(cv!.id)
            appContext.candidateDeleteState$.next(props.candidate)
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
