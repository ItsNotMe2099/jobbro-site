import styles from './index.module.scss'
import Title from '../Title'
import Card from './Card'

interface Props {

}

export default function VacanciesOfTheDay(props: Props) {

  const cards = [
    {
      salary: '$15 / hr',
      country: 'Indonesia',
      position: 'Senior Manager of Software Development and Engineering',
      views: 1.4,
      published: '25 Jun 2023'
    },
    {
      salary: '$15 / hr',
      country: 'Indonesia',
      position: 'Senior Manager of Software Development and Engineering',
      views: 1.4,
      published: '25 Jun 2023'
    },
    {
      salary: '$15 / hr',
      country: 'Indonesia',
      position: 'Senior Manager of Software Development and Engineering',
      views: 1.4,
      published: '25 Jun 2023'
    },
    {
      salary: '$15 / hr',
      country: 'Indonesia',
      position: 'Senior Manager of Software Development and Engineering',
      views: 1.4,
      published: '25 Jun 2023'
    },
    {
      salary: '$15 / hr',
      country: 'Indonesia',
      position: 'Senior Manager of Software Development and Engineering',
      views: 1.4,
      published: '25 Jun 2023'
    },
    {
      salary: '$15 / hr',
      country: 'Indonesia',
      position: 'Senior Manager of Software Development and Engineering',
      views: 1.4,
      published: '25 Jun 2023'
    },
  ]

  return (
    <div className={styles.root}>
      <Title title='Vacancies of the day' text='New hot jobs' />
      <div className={styles.cards}>
        {cards.map((i, index) =>
          <Card key={index} salary={i.salary} country={i.country} position={i.position} views={i.views} published={i.published} />
        )}
      </div>
    </div>
  )
}
