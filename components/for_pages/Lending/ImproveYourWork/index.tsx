import Light2Svg from '@/components/svg/Light2Svg'
import styles from './index.module.scss'
import { useResize } from '@/components/hooks/useResize'
import TryDemoBtnSvg from '@/components/svg/TryDemoBtnSvg'

interface Props {

}

export default function ImproveYourWork(props: Props) {

  const { isPhoneWidth } = useResize()

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Improve your work{isPhoneWidth && <br />} today
      </div>
      <div className={styles.text}>
        Sign up and get a free demo.
      </div>
      <div className={styles.bottom}>
        {!isPhoneWidth ? <Light2Svg className={styles.button} /> : <TryDemoBtnSvg className={styles.button} />}
      </div>
    </div>
  )
}
