import styles from './index.module.scss'
import {IHiringStageForDashBoard} from '@/data/interfaces/IHiringStage'


interface Props {
  hiringStage: IHiringStageForDashBoard
}

export default function HiringStage(props: Props) {
  const {hiringStage} = props
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.rect} style={{ height: `${hiringStage.conversionRate || 2}%` }} />
      </div>
      <div className={styles.percent}>
        <div className={styles.number}>
          {hiringStage.conversionRate}
        </div>
        <div className={styles.sign}>
          %
        </div>
      </div>
      <div className={styles.label}>
        {hiringStage.title}
      </div>
      <div className={styles.separator} />
      <div className={styles.bottom}>
        <div className={styles.total}>{hiringStage.candidatesCount}</div>
        <div className={styles.percent}>{hiringStage.stageConversionRate}%</div>
      </div>
    </div>
  )
}
