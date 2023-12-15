import styles from './index.module.scss'

interface Props {
  position: string
  salary: string
  vacancies: number
  index: number
}

export default function Card(props: Props) {

  const getColor = (index: number) => {
    switch (index) {
      case 0:
        return '#EEE3FF'
      case 1:
        return '#FBFFE3'
      case 2:
        return '#E3FFFC'
      case 3:
        return '#FFE3EA'
      case 4:
        return '#E6FFE3'
      case 5:
        return '#FFF7E3'
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.top} style={{ backgroundColor: `${getColor(props.index)}` }}>
        <div className={styles.position}>{props.position}</div>
        <div className={styles.salary}>{props.salary}</div>
      </div>
      <div className={styles.bottom}>
        {props.vacancies} vacancies
      </div>
    </div>
  )
}
