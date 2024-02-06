import styles from 'components/for_pages/FindJobs/VacanciesOfTheDay/index.module.scss'
import Title from 'components/for_pages/FindJobs/Title'
import {useFindJobsMainContext} from '@/context/find_jobs_main_state'
import VacancyOfTheDayCard from 'components/for_pages/FindJobs/VacanciesOfTheDay/VacancyOfTheDayCard'

interface Props {

}

export default function VacanciesOfTheDay(props: Props) {
  const findJobsMainContext = useFindJobsMainContext()
  return (
    <div className={styles.root}>
      <Title title='Vacancies of the day' text='New hot jobs' />
      <div className={styles.cards}>
        {findJobsMainContext.vacanciesCurrentDay.data.map((i, index) =>
          <VacancyOfTheDayCard key={i.id} vacancy={i} />
        )}
      </div>
    </div>
  )
}
