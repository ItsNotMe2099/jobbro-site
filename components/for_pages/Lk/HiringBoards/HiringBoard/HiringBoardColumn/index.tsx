import {Draggable} from 'react-beautiful-dnd'
import styles from './index.module.scss'
import HiringBoardCardList from '@/components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardCardList'
import {IHiringStageWithApply} from '@/data/interfaces/IHiringStage'
import {ICVWithApply} from '@/data/interfaces/ICV'
import {omit} from '@/utils/omit'
import HiringBoardColumnHeader from '@/components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardColumnHeader'
interface Props {
  hiringStage: IHiringStageWithApply
  index: number
}

export default function HiringBoardColumn(props: Props) {
  const hiringStage = props.hiringStage
  console.log('Props.index', props.index)
  return (
    <Draggable draggableId={`stage_${hiringStage.id}`} index={props.index}>
      {(provided, snapshot) => (
        <div className={styles.root} ref={provided.innerRef} {...provided.draggableProps}>
         <HiringBoardColumnHeader dragProvided={provided} hiringStage={hiringStage}/>
          <HiringBoardCardList
            listId={`stage_${hiringStage.id}`}
            listType="applies"
            style={{
              backgroundColor: snapshot.isDragging ? 'red' : null
            }}
            applies={[...hiringStage.applications.map(i => ({...i.cv, applications: [omit(i, ['cv'])] }) as ICVWithApply), ...hiringStage.proposals.map(i => ({...i.cv, proposals: [omit(i, ['cv'])] }) as ICVWithApply)]}
          />
        </div>
      )}
    </Draggable>
  )
}
