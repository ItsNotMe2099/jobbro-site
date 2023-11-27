import styles from './index.module.scss'
import {IHiringStageWithApply} from '@/data/interfaces/IHiringStage'
import {DraggableProvided} from 'react-beautiful-dnd'

interface Props {
  hiringStage: IHiringStageWithApply
  dragProvided: DraggableProvided
}

export default function HiringBoardColumnHeader(props: Props) {
  const stage = props.hiringStage

  return (
        <div className={styles.root} {...props.dragProvided.dragHandleProps}>
          <div className={styles.handle} ></div>
         <div className={styles.title}>{stage.title}</div>
          <div className={styles.right}>
          <div className={styles.amount}>{stage?.currentCandidatesCount}</div>
          <div className={styles.conversion}>{stage?.stageConversionRate}%</div>
          </div>
        </div>
  )
}
