import styles from './index.module.scss'
import Button from '@/components/ui/Button'

interface Props {
  color: string
}

export default function JobAd(props: Props) {

  return (
    <div className={styles.preview} style={{ backgroundColor: props.color }}>
      <div className={styles.top}>
        Cuprum
      </div>
      <div className={styles.title}>
        Job title
      </div>
      <div className={styles.info}>
        <div className={styles.salary}>
          Salary
        </div>
        <div className={styles.separator} />
        <div className={styles.salary}>
          Location
        </div>
      </div>
      <Button className={styles.btn} color='green' styleType='large'>
        Apply now
      </Button>
      <div className={styles.bottom}>
        We Hire with Jobbro
      </div>
    </div>
  )
}
