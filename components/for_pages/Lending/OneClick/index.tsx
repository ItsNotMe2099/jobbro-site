import styles from './index.module.scss'
import ArrowClickSvg from '@/components/svg/ArrowClickSvg'
import { colors } from '@/styles/variables'
import SocialsSvg from '@/components/svg/SocialsSvg'
import { useResize } from '@/components/hooks/useResize'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export default function OneClick(props: Props) {
  const { t } = useTranslation()
  const { isPhoneWidth } = useResize()

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <ArrowClickSvg color={colors.greenLending} />
          <div className={styles.title}>
            {t('main_lending_one_click_title')}
          </div>
          <div className={styles.text}>
            {t('main_lending_one_click_desc')}
            </div>
        </div>
        <SocialsSvg className={styles.svg} />
      </div>
    </div>
  )
}
