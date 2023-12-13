import styles from './index.module.scss'
import {IHiringStageWithApply} from '@/data/interfaces/IHiringStage'
import {DraggableProvided} from 'react-beautiful-dnd'
import {colors} from '@/styles/variables'
import IconButton from '@/components/ui/IconButton'
import CloseSvg from '@/components/svg/CloseSvg'
import {useHiringBoardContext} from '@/context/hiring_board_state'
import DragSvg from '@/components/svg/DragSvg'

interface Props {
  hiringStage: IHiringStageWithApply
  dragProvided: DraggableProvided
  isEdit?: boolean
}

export default function HiringBoardColumnHeader(props: Props) {
  const stage = props.hiringStage
  const hiringBoardContext = useHiringBoardContext()
  return (
        <div className={styles.root} >
          {props.isEdit && <div
            {...props.dragProvided.dragHandleProps}>
            <DragSvg color={colors.simpleGrey}/>
          </div>}
         <div className={styles.title}>{stage.title}</div>
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
