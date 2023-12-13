import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import {ICVEvaluation} from '@/data/interfaces/ICVEvaluation'

interface Props {

  evaluation: ICVEvaluation
}

export default function CardAiComment(props: Props) {

  return (
    <Card>
      <div className={styles.root}>
        <div className={styles.percent}>
          {props.evaluation.percentEvaluation}%
        </div>
        <div className={styles.text}>
          {props.evaluation.justification}
        </div>
      </div>
    </Card>
  )
}
