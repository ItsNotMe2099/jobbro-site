import styles from './index.module.scss'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Column from './components/Column'

interface Props {
  candidates: any[]
}

export default function Stages(props: Props) {

  const data = [
    {
      id: 'column-1',
      title: 'Pre interview',
      taskIds: props.candidates,
    },
    {
      id: 'column-2',
      title: 'Interview',
      taskIds: [],
    },
    {
      id: 'column-3',
      title: 'Awaiting Response',
      taskIds: [],
    },
  ]

  const handleOnDragEnd = (result: DropResult) => {

  }


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={styles.container}>
        {data.map(i => {

          return <Column key={i.id} column={i} items={i.taskIds} />
        })}
      </div>
    </DragDropContext>
  )
}
