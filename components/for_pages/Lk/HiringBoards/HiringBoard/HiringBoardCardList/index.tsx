import React from 'react'
import {Draggable, DroppableProvided} from 'react-beautiful-dnd'
import styles from './index.module.scss'
import HiringBoardCard from '@/components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardCard'
import {ICVWithApply} from '@/data/interfaces/ICV'
import {StrictModeDroppable} from '@/components/ui/StrictModeDroppable'
import {colors} from '@/styles/variables'
export const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
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
}

const InnerQuoteList = React.memo((props: InnerQuoteListProps)  => {
  return props.applies.map((i, index) => (
    <Draggable key={i.id} draggableId={`${i.id}`} index={index}>
      {(dragProvided, dragSnapshot) => <HiringBoardCard key={i.id} apply={i} isDragging={dragSnapshot.isDragging} isGroupedOver={Boolean(dragSnapshot.combineTargetFor)} dragProvided={dragProvided} />}
    </Draggable>
  ))
})
interface InnerListProps{
  title: string
  applies: ICVWithApply[]
  dropProvided: DroppableProvided
}
function InnerList(props: InnerListProps) {
  const { applies, dropProvided } = props
    console.log('InnerRef', dropProvided.innerRef)
  return (
    <div className={styles.innerList}>
      <div className={styles.dropZone} ref={dropProvided.innerRef}>
        <InnerQuoteList applies={applies} />
        {dropProvided.placeholder}
      </div>
    </div>
  )
}

interface Props{
  isDraggingOver?: boolean
  isDraggingFrom?: boolean

  ignoreContainerClipping: boolean,
  scrollContainerStyle: any
  isDropDisabled: boolean
  listId: string
  listType: string
  style: any
  applies: ICVWithApply[]
}
export default function HiringBoardCardList(props: Props) {
  const { ignoreContainerClipping, internalScroll, scrollContainerStyle, isDropDisabled, isCombineEnabled, listId = 'LIST', listType, style, quotes, title, useClone } = props

  return (
    <StrictModeDroppable droppableId={listId} type={listType} ignoreContainerClipping={ignoreContainerClipping} isDropDisabled={isDropDisabled} isCombineEnabled={isCombineEnabled} renderClone={useClone ? (provided, snapshot, descriptor) => <HiringBoardCard quote={quotes[descriptor.source.index]} provided={provided} isDragging={snapshot.isDragging} isClone /> : null}>
      {(dropProvided, dropSnapshot) => (
        <div className={styles.wrapper} style={{...style, backgroundColor:  getBackgroundColor(props.isDraggingOver, props.isDraggingFrom), opacity: isDropDisabled ? 0.5 : 'inherit'}} {...dropProvided.droppableProps}>
            <InnerList applies={props.applies} dropProvided={dropProvided} />
        </div>
      )}
    </StrictModeDroppable>
  )
}
