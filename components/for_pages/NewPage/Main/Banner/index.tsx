import BannerSvg from '@/components/svg/BannerSvg'
import styles from './index.module.scss'
import CloseSvg from '@/components/svg/CloseSvg'
import { colors } from '@/styles/variables'

interface Props {
  onClose: () => void
}

export default function Banner(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        Find your dream <br />job with us
      </div>
      <BannerSvg />
      <CloseSvg color={colors.white} className={styles.close} onClick={props.onClose} />
    </div>
  )
}
