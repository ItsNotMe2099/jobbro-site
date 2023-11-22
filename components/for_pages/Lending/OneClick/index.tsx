import styles from './index.module.scss'
import ArrowClickSvg from '@/components/svg/ArrowClickSvg'
import { colors } from '@/styles/variables'
import SocialsSvg from '@/components/svg/SocialsSvg'

interface Props {

}

export default function OneClick(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <ArrowClickSvg color={colors.greenLending} />
          <div className={styles.title}>
            One click — all platforms
          </div>
          <div className={styles.text}>
            With our solution you can post your jobs one each<br /> main platform. One click and everybody will see you<br /> new position.
          </div>
        </div>
        <SocialsSvg />
      </div>
    </div>
  )
}
