import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import {ICVEvaluation} from '@/data/interfaces/ICVEvaluation'
import useTranslation from 'next-translate/useTranslation'
import Spinner from '@/components/ui/Spinner'

interface Props {
  evaluation: ICVEvaluation | undefined | null
  className?: string
}

export default function CardAiSummary(props: Props) {
  const { t } = useTranslation()

  const isLoading = !props.evaluation
  return (
    <Card className={props.className} title={t('cv_preview_ai_summary_title')}>
      <div className={styles.container}>
        {!props.evaluation && <div className={styles.loader}><Spinner size={32}/></div>}
        <div className={styles.comment}>
          {props.evaluation && <div className={styles.percent}>
            {props.evaluation?.percentEvaluation}%
          </div>}

          {props.evaluation && <div className={styles.text}>{props.evaluation?.justification}</div>}
        </div>
      </div>
    </Card>
  )
}
