import Light2Svg from '@/components/svg/Light2Svg'
import styles from './index.module.scss'

interface Props {

}

export default function ImproveYourWork(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Improve your work today
      </div>
      <div className={styles.text}>
        Sign up and get a free demo.
      </div>
      <div className={styles.bottom}>
        <Light2Svg className={styles.button} />
      </div>
    </div>
  )
}
