import styles from 'components/for_pages/FindJobs/VacanciesOfTheDay/index.module.scss'
import Title from 'components/for_pages/FindJobs/Title'
import {useFindJobsMainContext} from '@/context/find_jobs_main_state'
import VacancyOfTheDayCard from 'components/for_pages/FindJobs/VacanciesOfTheDay/VacancyOfTheDayCard'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export default function VacanciesOfTheDay(props: Props) {
  const findJobsMainContext = useFindJobsMainContext()
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <Title title={t('find_jobs_vacancies_of_day_title')} text={t('find_jobs_vacancies_of_day_desc')} />
      <div className={styles.cards}>
        {findJobsMainContext.vacanciesCurrentDay.data.map((i, index) =>
          <VacancyOfTheDayCard key={i.id} vacancy={i} />
        )}
      </div>
    </div>
  )
}
