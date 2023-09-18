import Button from '@/components/ui/Button'
import styles from './index.module.scss'

interface Props {

}

export default function Card(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Account created
      </div>
      <div className={styles.text}>
        We was send message to your email with link for confirm email address. Link will be actuality 12 hours.
      </div>
      <Button className={styles.btn} styleType='large' color='green'>
        Okey
      </Button>
    </div>
  )
}
