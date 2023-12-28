import styles from 'components/for_pages/Lk/HiringBoards/HiringBoard/HiringBoardCard/index.module.scss'
import AvatarCircular from '@/components/ui/AvatarCircular'
import {ICVWithApply} from '@/data/interfaces/ICV'
import UserUtils from '@/utils/UserUtils'
import VacancyUtils from '@/utils/VacancyUtils'
import {DraggableProvided} from 'react-beautiful-dnd'
import DragSvg from '@/components/svg/DragSvg'
import {colors} from '@/styles/variables'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import {useHiringBoardContext} from '@/context/hiring_board_state'
interface Props {
  apply: ICVWithApply
  dragProvided: DraggableProvided
  isDragging?: boolean
  isDraggable?: boolean
}

export default function HiringBoardCard(props: Props) {
  const {apply, dragProvided} = props
  const hiringBoardContext = useHiringBoardContext()
  return (

        <div className={styles.root} ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
          {props.isDraggable && <div {...dragProvided.dragHandleProps}>
            <DragSvg color={colors.simpleGrey}/>
          </div>}
          <Link href={Routes.lkHiringBoardCv(hiringBoardContext.vacancyId!, apply.id)} className={styles.link}>
          <AvatarCircular size={40} initials={apply?.name?.charAt(0)} file={apply?.image ?? apply?.profile?.image ?? null} />
          <div className={styles.info}>
            <div className={styles.name}>
              {UserUtils.getName(apply)}
            </div>
            <div className={styles.salary}>
              {apply && VacancyUtils.formatSalary(apply)}
            </div>
          </div>
          </Link>
        </div>


  )
}
