import styles from './index.module.scss'
import IHiringStage, {IHiringStageWithApply} from '@/data/interfaces/IHiringStage'
import {DraggableProvided} from 'react-beautiful-dnd'
import {colors} from '@/styles/variables'
import IconButton from '@/components/ui/IconButton'
import CloseSvg from '@/components/svg/CloseSvg'
import {useHiringBoardContext} from '@/context/hiring_board_state'
import DragSvg from '@/components/svg/DragSvg'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  hiringStage: IHiringStageWithApply
  dragProvided: DraggableProvided
  isEdit?: boolean
}

export default function HiringBoardColumnHeader(props: Props) {
  const stage = props.hiringStage
  const hiringBoardContext = useHiringBoardContext()
  const { t } = useTranslation()
  const formatStageTitle = (stage: IHiringStage) => {
    switch (stage.key){
      case 'applied':
        return t('hiring_boards_card_stage_applied')
      case 'inReview':
        return t('hiring_boards_card_stage_in_review')
      case 'offer':
        return t('hiring_boards_card_stage_offer')
      default:
        return stage?.title ?? null
    }
  }
  return (
        <div className={styles.root} >
          {props.isEdit && <div
            {...props.dragProvided.dragHandleProps}>
            <DragSvg color={colors.simpleGrey}/>
          </div>}
         <div className={styles.title}>{formatStageTitle(stage)}</div>
          <div className={styles.right}>
          <div className={styles.amount}>{stage?.currentCandidatesCount}</div>
          <div className={styles.conversion}>{Math.round(stage.stageConversionRate ?? 0)}%</div>
          </div>
          {props.isEdit && <IconButton
            size={'small'}
            onClick={() => hiringBoardContext.deleteHiringStage(props.hiringStage)}>
            <CloseSvg color={colors.textSecondary}/>
          </IconButton>}
        </div>
  )
}
