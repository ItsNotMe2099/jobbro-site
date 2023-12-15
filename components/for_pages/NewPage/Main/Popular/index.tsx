import Card from './Card'
import styles from './index.module.scss'

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
      <div className={styles.title}>
        Popular professions
      </div>
      <div className={styles.cards}>
        {cards.map((i, index) =>
          <Card position={i.position} salary={i.salary} vacancies={i.vacancies} index={index} key={index} />
        )}
      </div>
    </div>
  )
}
