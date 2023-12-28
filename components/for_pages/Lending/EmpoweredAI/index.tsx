import GearSvg from '@/components/svg/GearSvg'
import Item from './Item'
import styles from './index.module.scss'
import SortSvg from '@/components/svg/SortSvg'
import DataBaseSvg from '@/components/svg/DataBaseSvg'
import ClickSvg from '@/components/svg/ClickSvg'
import { useResize } from '@/components/hooks/useResize'
import useTranslation from 'next-translate/useTranslation'

interface Props {

}

export default function EmpoweredAI(props: Props) {
  const { t } = useTranslation()
  const { isPhoneWidth } = useResize()

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.recruitment}>
              {t('main_lending_ai_title')}
            </div>
            <div className={styles.everything}>
              {t('main_lending_ai_desc')}
              <div className={styles.line} />
            </div>
          </div>
          <div className={styles.middle}>
            <Item icon={<GearSvg className={styles.icon} />} text={<>{t('main_lending_ai_feature_auto_create_job')} →</>} />
            <Item icon={<SortSvg className={styles.icon} />} text={<>{t('main_lending_ai_feature_sort_apps')} →</>} />
            <Item icon={<DataBaseSvg className={styles.icon} />} text={<>{t('main_lending_ai_feature_easy_access')} →</>} />
            <Item icon={<ClickSvg className={styles.icon} />} text={<>{t('main_lending_ai_feature_cross_posting')} →</>} />
          </div>
          <div className={styles.bottom}>
            <div className={styles.inner}>
              <div className={styles.percent}>
                300<span>%</span>
              </div>
              <div className={styles.hr}>
                {isPhoneWidth ?  t('main_lending_ai_percent_label_mobile') : t('main_lending_ai_percent_label_desktop')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
