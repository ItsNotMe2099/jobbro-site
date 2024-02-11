import styles from './index.module.scss'

import Link from 'next/link'
import Card from '../../Common/Card'
import CompanyCard from './CompanyCard'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export default function VacanciesByLocation(props: Props) {
  const {t} = useTranslation()
  const companies = [
    { name: 'Xing', image: '/profiles/xing.png', vacancies: 632 },
    { name: 'LinkedIn', image: '/profiles/linkedin.png', vacancies: 632 },
    { name: 'Greenhouse', image: '/profiles/greenhouse.png', vacancies: 632 },
  ]

  return (
    <div className={styles.root}>
      <Card className={styles.wrapper} title={t('find_jobs_companies_title')}>
        <div className={styles.better}>
          Better company in recent times
        </div>
        <div className={styles.content}>
          {companies.map((i, index) =>
            <CompanyCard name={i.name} image={i.image} vacancies={i.vacancies} key={index} />
          )}
        </div>
        <Link href={'#'} className={styles.bottom}>
          {t('find_jobs_companies_more')}
        </Link>
      </Card>
    </div>

  )
}
