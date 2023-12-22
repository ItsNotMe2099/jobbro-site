import styles from './index.module.scss'
import {IAiCvRequest} from '@/data/interfaces/IAiCvRequest'
import MenuButton from '@/components/ui/MenuButton'
import {IOption, Nullable} from '@/types/types'
import {colors} from '@/styles/variables'
import CloseSvg from '@/components/svg/CloseSvg'
import IconButton from '@/components/ui/IconButton'
import FileSvg from '@/components/svg/FileSvg'
import Spinner from '@/components/ui/Spinner'
import ImageHelper from '@/utils/ImageHelper'
import {Line} from 'rc-progress'
import classNames from 'classnames'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import Checkbox from '@/components/ui/Checkbox'
import {useState} from 'react'
import {useAiCvRequestListOwnerContext} from '@/context/ai_cv_request_list_state'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'


enum MenuKey{
  Select = 'select',
  OpenToCheck = 'openToCheck',
  MoveToAllProfiles = 'moveToAllProfiles',
  Delete = 'delete'
}

interface Props {
    request: Nullable<IAiCvRequest>;
    isCompleted: boolean;
    fileName?: string;
    fileProgress?: number;
    onDelete?: () => void
    onSelect?: () => void;
    isSelectable?: boolean
    isChecked?: boolean
}

const AiCvRequestItemInner = (props: Props) => {
  const router = useRouter()
  const aiCvRequestListContext = useAiCvRequestListOwnerContext()
  const { t } = useTranslation()
  const [actionLoading, setActionLoading] = useState(false)
  const menuOptions: IOption<MenuKey>[] = [
    {label: t('request_cv_card_menu_select'), value: MenuKey.Select},
    {label: t('request_cv_card_menu_open_to_check'), value: MenuKey.OpenToCheck},
    {label: t('request_cv_card_menu_move'), value: MenuKey.MoveToAllProfiles},
    {label: t('request_cv_card_menu_delete'), value: MenuKey.Delete, color: colors.textRed},

  ]
  const handleMenuItemClick = async (key: MenuKey) => {
    if(actionLoading){
      return
    }
    switch (key){
      case MenuKey.Select:
        props.onSelect?.()
        break
      case MenuKey.OpenToCheck:
        router.push(Routes.lkCandidateAiCvRequest(props.request?.id!))
        break
      case MenuKey.MoveToAllProfiles:
        setActionLoading(true)
        await aiCvRequestListContext.moveById(props.request?.id!)
        setActionLoading(false)
        break
      case MenuKey.Delete:
        setActionLoading(true)
        await aiCvRequestListContext.deleteById(props.request?.id!)
        setActionLoading(false)
        break
    }
  }
  const handleDelete = async () => {
    if(props.request) {
      setActionLoading(true)
      await aiCvRequestListContext.deleteById(props.request?.id!)
      setActionLoading(false)
    }else{
      props.onDelete?.()
    }
  }
  return (
      <div className={styles.root}>
        {!actionLoading && props.isSelectable && <div onClick={props.onSelect}><Checkbox checked={props.isChecked ?? false}/></div>}
        {!actionLoading && !props.isSelectable && <div className={styles.circle}>
          {props.isCompleted ? <FileSvg color={colors.white}/> : <Spinner size={24} color={colors.white} secondaryColor={colors.green}/>}
        </div>}
        {actionLoading && <div className={styles.circle}>
           <Spinner size={24} color={colors.white} secondaryColor={colors.green}/>
        </div>}
        <div className={styles.center}>
          {props.request && <a href={ImageHelper.urlFromSource(props.request.file?.source ?? '#')} target={'_blank'} className={classNames(styles.title, styles.link)}>{props.request?.file?.name}</a>}
          {!props.request && <div  className={styles.title}>{props.fileName}</div>}
          {!props.request && <Line className={styles.progress} percent={props.fileProgress ?? 0} trailWidth={1} strokeWidth={1} strokeColor={colors.green}
                trailColor={colors.textSecondary}/>}
        </div>
         {props.isCompleted && <Link href={Routes.lkCandidateAiCvRequest(props.request?.id!)} className={styles.check}>Open to check</Link>}

        {props.isCompleted && !actionLoading && <MenuButton<MenuKey> options={menuOptions} onClick={handleMenuItemClick}/>}
        {!props.isCompleted && <IconButton
          size={'small'}
          disabled={actionLoading}
          onClick={handleDelete}>
          <CloseSvg color={colors.textSecondary}/>
        </IconButton>}
      </div>
  )
}

export default function AiCvRequestItem(props: Props) {
  return (<AiCvRequestItemInner {...props}/>)
}
