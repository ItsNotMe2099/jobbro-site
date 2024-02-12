import styles from 'components/for_pages/FindJobs/VacanciesByLocation/index.module.scss'
import Title from 'components/for_pages/FindJobs/Title'
import { useAppContext } from '@/context/state'
import {useFindJobsMainContext} from '@/context/find_jobs_main_state'
import VacanciesByLocationCard from 'components/for_pages/FindJobs/VacanciesByLocation/VacanciesByLocationCard'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export default function VacanciesByLocation(props: Props) {
  const {isTabletWidth} = useAppContext().size
  const findJobsMainContext = useFindJobsMainContext()
  const vacanciesByLocation = findJobsMainContext.vacanciesByLocation
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <Title title={t('find_jobs_vacancies_work_in_title', {location: vacanciesByLocation.searchBy === 'city' ? vacanciesByLocation.location?.city?.names['en'] : (vacanciesByLocation.location?.country ? vacanciesByLocation.location?.country?.names['en'] : '' ) })} text={`${vacanciesByLocation.searchBy === 'city' ? t('find_jobs_vacancies_work_in_desc_city') : t('find_jobs_vacancies_work_in_desc_country')}`} link={''} hideLink={isTabletWidth} />
      <div className={styles.cards}>
        {findJobsMainContext.vacanciesByLocation.data.map((i, index) =>
          <VacanciesByLocationCard key={index} vacancy={i} />
        )}
      </div>
    </div>
  )
}
