import styles from 'components/for_pages/FindJobs/Banner/index.module.scss'

import BannerSvg from '@/components/svg/BannerSvg'
import CloseSvg from '@/components/svg/CloseSvg'
import { colors } from '@/styles/variables'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  onClose: () => void
}

export default function Banner(props: Props) {
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <div className={styles.text}>
        {t('find_jobs_banner_dream')}
      </div>
      <BannerSvg  className={styles.bannerSvg}/>
      <CloseSvg color={colors.white} className={styles.close} onClick={props.onClose} />
    </div>
  )
}
