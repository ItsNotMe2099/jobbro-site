import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import Link from 'next/link'
import HiringStage from './HiringStage'
import { IVacancyWithHiringStagesForDashBoard} from '@/data/interfaces/IVacancy'
import {Routes} from '@/types/routes'


interface Props {
  vacancy: IVacancyWithHiringStagesForDashBoard
  onMain?: boolean
}

export default function VacancyHiringStageCard(props: Props) {
  return (
    <Card className={styles.root}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          {props.onMain && <div className={styles.title}>Hiring Stage Conversion</div>}
          <div className={props.onMain ? styles.position : styles.title}>
            {props.vacancy.name}
          </div>
        </div>
        <div className={styles.topRight}>
          {props.onMain &&  <Link className={styles.more} href={Routes.lkDashboardMyBoardHiringStages}>Show more</Link>}
          <div className={styles.totalRate}>
            <div className={styles.totalRateValue}>{props.vacancy.conversionRate}<span className={styles.totalRateValueSuffix}>%</span></div>
            <div className={styles.totalRateLabel}>Total rate</div>
          </div>
        </div>


      </div>

      <div className={styles.items}>
        {props.vacancy.hiringStages.map((i, index) =>
          <HiringStage key={i.id} hiringStage={i} />
        )}
      </div>
    </Card>
  )
}
