import {HiringBoardWrapper, useHiringBoardContext} from '@/context/hiring_board_state'
import {DragDropContext} from 'react-beautiful-dnd'
import HiringBoardColumn from '@/components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardColumn'
import styles from './index.module.scss'
import {StrictModeDroppable} from '@/components/ui/StrictModeDroppable'
interface Props {
  vacancyId: number
}

const HiringBoardInner = (props: Props) => {
  const hiringBoardContext = useHiringBoardContext()

  const onDragEnd = (result) => {

  }

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="board" type="COLUMN" direction="horizontal" ignoreContainerClipping={false} >
          {(provided) => (
            <div className={styles.root} >
              <div className={styles.wrapper} ref={provided.innerRef} {...provided.droppableProps}>
              {hiringBoardContext.vacancy?.hiringStages?.map((i, index) => <HiringBoardColumn key={`stage_${i.id}`} index={index} hiringStage={i} />)}
              {hiringBoardContext.vacancy?.hiringStages?.map((i, index) => <HiringBoardColumn key={`stage_${i.id}`} index={index} hiringStage={i} />)}
              {hiringBoardContext.vacancy?.hiringStages?.map((i, index) => <HiringBoardColumn key={`stage_${i.id}`} index={index} hiringStage={i} />)}

              {provided.placeholder}
              </div>
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
  )
}

export default function HiringBoard(props: Props) {
  return (<HiringBoardWrapper vacancyId={props.vacancyId}>
    <HiringBoardInner {...props}/>
  </HiringBoardWrapper>)
}
