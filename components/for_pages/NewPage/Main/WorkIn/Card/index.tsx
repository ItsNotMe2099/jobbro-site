import Eye2Svg from '@/components/svg/Eye2Svg'
import styles from './index.module.scss'

interface Props {
  salary: string
  country: string
  position: string
  views: number
  published: string
}

export default function Card(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.salary}>
            {props.salary}
          </div>
          <div className={styles.country}>
            {props.country}
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.market}>
            Market
          </div>
          <div className={styles.position}>
            {props.position}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <Eye2Svg color='#838383' />
            <div className={styles.views}>
              {props.views}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.date}>
              Publish Date:
            </div>
            <div className={styles.published}>
              {props.published}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
