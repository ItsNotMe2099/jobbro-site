import styles from './index.module.scss'

import BannerSvg from '@/components/svg/BannerSvg'
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
      <BannerSvg  className={styles.bannerSvg}/>
      <CloseSvg color={colors.white} className={styles.close} onClick={props.onClose} />
    </div>
  )
}
