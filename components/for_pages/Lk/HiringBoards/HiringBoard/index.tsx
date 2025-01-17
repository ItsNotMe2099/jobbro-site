import styles from './index.module.scss'
import {HiringBoardWrapper, useHiringBoardContext} from '@/context/hiring_board_state'
import {DragDropContext, OnDragEndResponder} from 'react-beautiful-dnd'
import HiringBoardColumn from '@/components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardColumn'
import {StrictModeDroppable} from '@/components/ui/StrictModeDroppable'
import HiringBoardNewColumn from '@/components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardNewColumn'

interface Props {
  vacancyId: number
  isEdit?: boolean
}

const HiringBoardInner = (props: Props) => {
  const hiringBoardContext = useHiringBoardContext()

  const handleDragEnd: OnDragEndResponder = (result) => {
    if (result.type === 'applies') {
      if (result.source.droppableId !== result.destination?.droppableId) {
        const cvId = parseInt(result.draggableId?.replace('apply_', '') ?? '', 10)
        const sourceHiringStageId = result.source?.droppableId ? parseInt(result.source?.droppableId?.replace('stage_', '') ?? '', 10) : null
        const destHiringStageId = result.destination?.droppableId ? parseInt(result.destination?.droppableId?.replace('stage_', '') ?? '', 10) : null

        if(sourceHiringStageId && destHiringStageId) {
          const cv = hiringBoardContext.appliesByStages[sourceHiringStageId]?.find(i => i.id === cvId)

          if(cv) {
            hiringBoardContext.moveToStage(cv, destHiringStageId)
          }
        }
      }
    }else if(result.type === 'COLUMN'){

      if (result.source.index !== result.destination?.index && (result.destination?.index ?? -1) >= 0) {
        const stageId = parseInt(result.draggableId?.replace('stage_', '') ?? '', 10)
        const destIndex = result.destination?.index
        hiringBoardContext.moveHiringStage(stageId, destIndex!)
      }
    }
  }

  return (<div className={styles.card}>
    <DragDropContext onDragEnd={handleDragEnd}>
      <StrictModeDroppable droppableId="board" type="COLUMN" direction="horizontal" ignoreContainerClipping={false}>
        {(provided) => (
          <div className={styles.root}>
            <div className={styles.wrapper} ref={provided.innerRef} {...provided.droppableProps}>
              {hiringBoardContext.hiringStages?.filter((i) => i.key !== 'offer').map((i, index) => <HiringBoardColumn key={`stage_${i.id}`}
                                                                                     index={index}
                                                                                     isEdit={props.isEdit}
                                                                                     hiringStage={i}/>)}
              {props.isEdit && <HiringBoardNewColumn/>}
              {hiringBoardContext.hiringStages?.filter((i) => i.key === 'offer').map((i, index) => <HiringBoardColumn key={`stage_${i.id}`}
                                                                                     index={hiringBoardContext.hiringStages.length - 1}
                                                                                     isEdit={props.isEdit}
                                                                                     hiringStage={i}/>)}

              {provided.placeholder}
            </div>
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
    </div>
  )
}

export default function HiringBoard(props: Props) {
  return (<HiringBoardWrapper vacancyId={props.vacancyId}>
    <HiringBoardInner {...props}/>
  </HiringBoardWrapper>)
}
