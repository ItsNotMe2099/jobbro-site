import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  color: string
}

export default function JobAd(props: Props) {
  const {t} = useTranslation()
  return (
    <div className={styles.preview} style={{ backgroundColor: props.color }}>
      <div className={styles.top}>
        {t('social_sharing_job_ad_company')}
      </div>
      <div className={styles.title}>
        {t('social_sharing_job_ad_job_title')}
      </div>
      <div className={styles.info}>
        <div className={styles.salary}>
          {t('social_sharing_job_ad_salary')}
        </div>
        <div className={styles.separator} />
        <div className={styles.salary}>
          {t('social_sharing_job_ad_location')}
        </div>
      </div>
      <Button className={styles.btn} color='green' styleType='large'>
        {t('social_sharing_job_ad_apply_now')}
      </Button>
      <div className={styles.bottom}>
        {t('social_sharing_job_ad_we_are_hire')}
      </div>
    </div>
  )
}
