import Light2Svg from '@/components/svg/Light2Svg'
import styles from './index.module.scss'
import { useResize } from '@/components/hooks/useResize'
import TryDemoBtnSvg from '@/components/svg/TryDemoBtnSvg'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export default function ImproveYourWork(props: Props) {
  const { t } = useTranslation()
  const { isPhoneWidth } = useResize()

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {t('main_lending_improve_title')}
      </div>
      <div className={styles.text}>
        {t('main_lending_improve_desc')}
      </div>
      <div className={styles.bottom}>
        {!isPhoneWidth ? <Light2Svg className={styles.button} /> : <TryDemoBtnSvg className={styles.button} />}
      </div>
    </div>
  )
}
