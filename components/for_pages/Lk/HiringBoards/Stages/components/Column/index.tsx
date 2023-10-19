import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import { Droppable } from 'react-beautiful-dnd'
import Candidate from '../Candidate'

interface Props {
  column: any
  items: any[]
}

export default function Column({ column, items }: Props) {


  return (
    <Card title={column.title}>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div className={styles.wrapper} ref={provided.innerRef}
            {...provided.droppableProps}>
            {items.map((i, index) =>
              <Candidate key={i.id} item={i} index={index} />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  )
}
