import Image from 'next/image'
import styles from './index.module.scss'

interface Props {
  image: string
  name: string
  vacancies: number
}

export default function CompanyCard(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Image className={styles.img} src={props.image} alt='' fill />
        <div className={styles.name}>{props.name}</div>
      </div>
      <div className={styles.bottom}>
        {props.vacancies} vacancies
      </div>
    </div>
  )
}
