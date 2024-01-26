import Button from 'components/ui/Button'
import styles from './500.module.scss'
import useTranslation from 'next-translate/useTranslation'

export default function ErrorException() {
  const {t} = useTranslation()
  return(
    <div className={styles.root}>
      <div className={styles.title}>{t('error_page_title')}</div>
        <Button href={'/'} type='button' className={styles.btn} styleType='large' color='green'>
          {t('error_page_button_home')}
        </Button>
    </div>
  )
}
