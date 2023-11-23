import styles from './index.module.scss'
import ArrowClickSvg from '@/components/svg/ArrowClickSvg'
import { colors } from '@/styles/variables'
import SocialsSvg from '@/components/svg/SocialsSvg'
import { useResize } from '@/components/hooks/useResize'

interface Props {

}

export default function OneClick(props: Props) {

  const { isPhoneWidth } = useResize()

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <ArrowClickSvg color={colors.greenLending} />
          <div className={styles.title}>
            One click — all platforms
          </div>
          <div className={styles.text}>
            With our solution you can post your jobs one each{!isPhoneWidth &&<br />} main platform. One{isPhoneWidth &&<br />} click and everybody will see you{!isPhoneWidth &&<br />} new{isPhoneWidth &&<br />} position.
          </div>
        </div>
        <SocialsSvg className={styles.svg} />
      </div>
    </div>
  )
}
