import styles from './index.module.scss'
import {IVacancyWithHiringStages} from '@/data/interfaces/IVacancy'
import AvatarCircular from '@/components/ui/AvatarCircular'
import Link from 'next/link'
import {Routes} from '@/types/routes'
interface Props {
  vacancy: IVacancyWithHiringStages
}

export default function HiringBoardListJobCard(props: Props) {

  const {vacancy} = props
  const hiringStages = vacancy.hiringStages
  return (
    <Link href={Routes.lkHiringBoard(vacancy.id)} className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>{vacancy.name}</div>
        <div className={styles.conversion}>
          <div className={styles.conversionValue}>{Math.round(vacancy.conversionRate ?? 0)}%</div>
          <div className={styles.conversionLabel}>Conversion rate</div>
        </div>
      </div>
      <div className={styles.stages}>
        {hiringStages.map((stage) => <div className={styles.stage}>
          <div className={styles.stageHeader}>
            <div className={styles.stageTitle}>
              {stage.title}
            </div>
            <div className={styles.stageConversion}>
              {Math.round(stage.stageConversionRate ?? 0)}%
            </div>
          </div>
          <div className={styles.photos}>
            {[...stage.applications, ...stage.proposals].map((i, index) =>
              <AvatarCircular size={32}  className={styles.avatar} initials={i.cv?.name?.charAt(0)} file={i.cv.image ?? i.cv?.profile?.image ?? null}  key={i.cvId} />
            )}
            {stage.currentCandidatesCount > 3 && <div className={styles.more}>+{stage.currentCandidatesCount-3}</div>}
          </div>
        </div>)}
      </div>
    </Link>
  )
}
