import Title from 'components/for_pages/FindJobs/Title'
import Card from 'components/for_pages/FindJobs/Popular/Card'
import styles from 'components/for_pages/FindJobs/Popular/index.module.scss'

interface Props {

}

export default function Popular(props: Props) {

  const cards = [
    { position: 'Designer', salary: '$1500 - $3500', vacancies: 632 },
    { position: 'Designer', salary: '$1500 - $3500', vacancies: 632 },
    { position: 'Designer', salary: '$1500 - $3500', vacancies: 632 },
    { position: 'Designer', salary: '$1500 - $3500', vacancies: 632 },
    { position: 'Designer', salary: '$1500 - $3500', vacancies: 632 },
    { position: 'Designer', salary: '$1500 - $3500', vacancies: 632 },
  ]

  return (
    <div className={styles.root}>
      <Title title={'Popular professions'} text={''}/>
      <div className={styles.cards}>
        {cards.map((i, index) =>
          <Card position={i.position} salary={i.salary} vacancies={i.vacancies} index={index} key={index} />
        )}
      </div>
    </div>
  )
}
