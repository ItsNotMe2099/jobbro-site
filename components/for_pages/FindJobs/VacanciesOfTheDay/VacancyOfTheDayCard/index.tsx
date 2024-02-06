import Eye2Svg from '@/components/svg/Eye2Svg'
import styles from 'components/for_pages/FindJobs/VacanciesOfTheDay/VacancyOfTheDayCard/index.module.scss'
import {IVacancy} from '@/data/interfaces/IVacancy'
import VacancyUtils from '@/utils/VacancyUtils'
import Formatter from '@/utils/formatter'

interface Props {
  vacancy: IVacancy
}

export default function VacancyOfTheDayCard(props: Props) {
  const vacancy = props.vacancy
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.middle}>
          {vacancy.project && <div className={styles.market}>
            {vacancy.project?.title}
          </div>}
          <div className={styles.position}>
            {vacancy.name}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.top}>
            <div className={styles.salary}>
              {VacancyUtils.formatSalary(vacancy)}
            </div>
            {vacancy.office?.country?.name && <div className={styles.country}>
              {vacancy.office?.country?.name}
            </div>}
          </div>
          <div className={styles.right}>
            <div className={styles.publish}>
              <div className={styles.left}>
                <Eye2Svg color='#838383' />
                <div className={styles.views}>
                  {vacancy.totalViews}
                </div>
              </div>
              <div className={styles.common}>
                <div className={styles.date}>
                  Publish Date:
                </div>
                <div className={styles.published}>
                  {Formatter.formatDate(vacancy.publishedAt ?? vacancy.createdAt!)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
