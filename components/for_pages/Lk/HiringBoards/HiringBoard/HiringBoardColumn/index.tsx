import {Draggable} from 'react-beautiful-dnd'
import styles from './index.module.scss'
import HiringBoardCardList from '@/components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardCardList'
import {IHiringStageWithApply} from '@/data/interfaces/IHiringStage'
import HiringBoardColumnHeader from '@/components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardColumnHeader'
import {useHiringBoardContext} from '@/context/hiring_board_state'
interface Props {
  hiringStage: IHiringStageWithApply
  index: number
  isEdit?: boolean
}

export default function HiringBoardColumn(props: Props) {
  const hiringBoardContext = useHiringBoardContext()
  const hiringStage = props.hiringStage
  console.log('Props.index', props.index)
  return (
    <Draggable draggableId={`stage_${hiringStage.id}`} isDragDisabled={!props.isEdit} index={props.index}>
      {(provided, snapshot) => (
        <div className={styles.root} ref={provided.innerRef} {...provided.draggableProps}>
         <HiringBoardColumnHeader isEdit={!!props.isEdit && !['applied','offer'].includes(hiringStage.key)} dragProvided={provided} hiringStage={hiringStage}/>
          <HiringBoardCardList
            listId={`stage_${hiringStage.id}`}
            listType="applies"
            style={{
              ...(snapshot.isDragging ? {  backgroundColor: 'red'} : {}),
            }}
            applies={hiringBoardContext.appliesByStages[hiringStage.id] ?? []}
          />
        </div>
      )}
    </Draggable>
  )
}
