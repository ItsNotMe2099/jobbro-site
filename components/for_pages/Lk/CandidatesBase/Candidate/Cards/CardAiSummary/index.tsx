import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import {ICVEvaluation} from '@/data/interfaces/ICVEvaluation'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  evaluation: ICVEvaluation
  className?: string
}

export default function CardAiSummary(props: Props) {
  const { t } = useTranslation()
  return (
    <Card className={props.className} title={t('cv_preview_ai_summary_title')}>
      <div className={styles.container}>
        <div className={styles.comment}>
          <div className={styles.percent}>
            {props.evaluation.percentEvaluation}%
          </div>
          <div className={styles.text}>{props.evaluation.justification}</div>
        </div>
      </div>
    </Card>
  )
}
