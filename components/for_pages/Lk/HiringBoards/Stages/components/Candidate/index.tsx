import Image from 'next/image'
import styles from './index.module.scss'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
  item: any
  index: number
}

export default function Candidate({ item, index }: Props) {


  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div className={styles.wrapper} {...provided.draggableProps}
          {...provided.dragHandleProps} ref={provided.innerRef}>
          <Image className={styles.avatar} src={item.avatar} alt='' fill />
          <div className={styles.info}>
            <div className={styles.name}>
              {item.name}
            </div>
            <div className={styles.salary}>
              {item.salaryPerHour}
            </div>
          </div>
        </div>
      )}
    </Draggable>

  )
}
