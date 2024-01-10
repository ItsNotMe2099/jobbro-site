import styles from './index.module.scss'
import Button from '@/components/ui/Button'

interface Props {
  title: string
  text: string
  btnText: string
  btnHref: string
}

export default function CardAuth(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {props.title}
      </div>
      <div className={styles.text}>
        {props.text}
      </div>
      <Button className={styles.btn} href={props.btnHref} styleType='large' color='green'>
        {props.btnText}
      </Button>
    </div>
  )
}
