import styles from './index.module.scss'

import Link from 'next/link'
import Card from '../../Common/Card'
import CompanyCard from './CompanyCard'

interface Props {

}

export default function WithTheBest(props: Props) {

  const companies = [
    { name: 'Xing', image: '/profiles/xing.png', vacancies: 632 },
    { name: 'LinkedIn', image: '/profiles/linkedin.png', vacancies: 632 },
    { name: 'Greenhouse', image: '/profiles/greenhouse.png', vacancies: 632 },
  ]

  return (
    <div className={styles.root}>
      <Card className={styles.wrapper} title={'Work with the best'}>
        <div className={styles.better}>
          Better company in recent times
        </div>
        <div className={styles.content}>
          {companies.map((i, index) =>
            <CompanyCard name={i.name} image={i.image} vacancies={i.vacancies} key={index} />
          )}
        </div>
        <Link href={'#'} className={styles.bottom}>
          More companies
        </Link>
      </Card>
    </div>

  )
}
