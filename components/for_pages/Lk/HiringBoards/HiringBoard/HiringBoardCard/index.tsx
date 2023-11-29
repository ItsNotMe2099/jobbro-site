import styles from 'components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardCard/index.module.scss'
import AvatarCircular from '@/components/ui/AvatarCircular'
import {ICVWithApply} from '@/data/interfaces/ICV'
import UserUtils from '@/utils/UserUtils'
import VacancyUtils from '@/utils/VacancyUtils'
import {DraggableProvided} from 'react-beautiful-dnd'

interface Props {
  apply: ICVWithApply
  dragProvided: DraggableProvided
  isDragging?: boolean
}

export default function HiringBoardCard(props: Props) {
  const {apply, dragProvided} = props
  return (

        <div className={styles.root} ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
          <AvatarCircular size={32}  className={styles.avatar} initials={apply?.name?.charAt(0)} file={apply?.image ?? apply?.profile?.image ?? null} />

          <div className={styles.info}>
            <div className={styles.name}>
              {UserUtils.getName(apply)}
            </div>
            <div className={styles.salary}>
              {apply && VacancyUtils.formatSalary(apply)}
            </div>
          </div>
        </div>


  )
}
