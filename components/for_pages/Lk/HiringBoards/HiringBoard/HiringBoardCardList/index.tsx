import React, {CSSProperties} from 'react'
import {Draggable, DroppableProvided} from 'react-beautiful-dnd'
import styles from './index.module.scss'
import HiringBoardCard from '@/components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardCard'
import {ICVWithApply} from '@/data/interfaces/ICV'
import {StrictModeDroppable} from '@/components/ui/StrictModeDroppable'
import {colors} from '@/styles/variables'
export const getBackgroundColor = (isDraggingOver: boolean, isDraggingFrom: boolean) => {
  if (isDraggingOver) {
    return colors.backgroundSuccess
  }
  if (isDraggingFrom) {
    return colors.backgroundSuccess
  }
  return 'transparent'
}

interface InnerQuoteListProps{
  applies: ICVWithApply[]
  isDraggable: boolean
}

const InnerQuoteList = React.memo((props: InnerQuoteListProps)  => {
  return props.applies.map((i, index) => (
    <Draggable key={i.id} draggableId={`${i.id}`} index={index}>
      {(dragProvided, dragSnapshot) => <HiringBoardCard isDraggable={props.isDraggable} key={i.id} apply={i} isDragging={dragSnapshot.isDragging} dragProvided={dragProvided} />}
    </Draggable>
  ))
})
interface InnerListProps{
  applies: ICVWithApply[]
  dropProvided: DroppableProvided
  isDraggable: boolean
}
function InnerList(props: InnerListProps) {
  const { applies, dropProvided } = props
  return (
    <div className={styles.innerList}>
      <div className={styles.dropZone} ref={dropProvided.innerRef}>
        <InnerQuoteList applies={applies} isDraggable={props.isDraggable} />
        {dropProvided.placeholder}
      </div>
    </div>
  )
}

interface Props{
  isDraggingOver?: boolean
  isDraggingFrom?: boolean

  ignoreContainerClipping?: boolean,
  isDropDisabled?: boolean
  listId: string
  listType: string
  style: CSSProperties
  applies: ICVWithApply[]
  isDraggable: boolean
}
export default function HiringBoardCardList(props: Props) {
  const { ignoreContainerClipping, isDropDisabled, listId = 'LIST', listType, style } = props

  return (
    <StrictModeDroppable droppableId={listId} type={listType} ignoreContainerClipping={ignoreContainerClipping} isDropDisabled={isDropDisabled} isCombineEnabled={false}>
      {(dropProvided, dropSnapshot) => (
        <div className={styles.wrapper} style={{...style, backgroundColor:  getBackgroundColor(props.isDraggingOver ?? false, props.isDraggingFrom ?? false), opacity: isDropDisabled ? 0.5 : 'inherit'}} {...dropProvided.droppableProps}>
            <InnerList applies={props.applies} dropProvided={dropProvided} isDraggable={props.isDraggable}/>
        </div>
      )}
    </StrictModeDroppable>
  )
}
