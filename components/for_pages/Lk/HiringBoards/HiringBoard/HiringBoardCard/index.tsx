import styles from './index.module.scss'
import AvatarCircular from '@/components/ui/AvatarCircular'
import {ICVWithApply} from '@/data/interfaces/ICV'
import UserUtils from '@/utils/UserUtils'
import VacancyUtils from '@/utils/VacancyUtils'
import {DraggableProvided} from 'react-beautiful-dnd'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import {useHiringBoardContext} from '@/context/hiring_board_state'
import {useCvEvaluationContext} from '@/context/cv_evaluation_state'
import {useEffect} from 'react'
interface Props {
  apply: ICVWithApply
  dragProvided: DraggableProvided
  isDragging?: boolean
  isDraggable?: boolean
}

export default function HiringBoardCard(props: Props) {
  const {apply, dragProvided} = props
  const hiringBoardContext = useHiringBoardContext()
  const cvEvaluationContext = useCvEvaluationContext()
  const evaluation = cvEvaluationContext.store[`${apply.id}:${hiringBoardContext.vacancyId!}`]?.evaluation
  useEffect(() => {
    cvEvaluationContext.addRecord(apply.id, hiringBoardContext.vacancyId!)
    return () => {
      cvEvaluationContext.removeRecord(apply.id, hiringBoardContext.vacancyId!)
    }
  }, [apply.id, hiringBoardContext.vacancyId])
  return (
        <div className={styles.root} ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...(props.isDraggable ? dragProvided.dragHandleProps : {})}>
          <div className={styles.top}>
          <AvatarCircular size={40} initials={apply?.name?.charAt(0)} file={apply?.image ?? apply?.profile?.image ?? null} />
          <div className={styles.info}>
            <div className={styles.name}>
              {UserUtils.getName(apply)}
            </div>
            <div className={styles.salary}>
              {apply && VacancyUtils.formatSalary(apply)}
            </div>
          </div>
          </div>
            <div className={styles.badges}>
              {!!evaluation?.percentEvaluation && <div className={styles.badge}>{evaluation?.percentEvaluation}%</div>}
              <Link href={Routes.lkHiringBoardCv(hiringBoardContext.vacancyId!, apply.id)} className={styles.badge}>Open cv</Link>

            </div>
        </div>


  )
}
