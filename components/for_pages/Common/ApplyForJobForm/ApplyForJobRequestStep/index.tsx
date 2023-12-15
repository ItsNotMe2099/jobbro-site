import styles from './index.module.scss'
enum StepKey{
  First = 'first',
  Confirm = 'confirm'
}
interface Props {
  title: string
  text: string
  btnText: string
}

export default function ApplyForJobRequestStep(props: Props) {

  return (
    <div className={styles.root}>
    Request Processing
    </div>
  )
}
