import Button from '@/components/ui/Button'
import styles from './index.module.scss'

interface Props {
  title: string
  text: string
  btnText: string
}

export default function Card(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {props.title}
      </div>
      <div className={styles.text}>
        {props.text}
      </div>
      <Button className={styles.btn} styleType='large' color='green'>
        {props.btnText}
      </Button>
    </div>
  )
}
