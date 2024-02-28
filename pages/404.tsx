import Button from 'components/ui/Button'
import styles from './404.module.scss'
import Layout from '@/components/layout/Layout'
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from 'next/router'

export default function ErrorNotFound() {
  const {t} = useTranslation()
  const router = useRouter()
  return <Layout>
    <div className={styles.root}>
      <div className={styles.title}>{t('404_page_title')}</div>
      <div className={styles.wrapper}>
        <img src={'/img/not_found.svg'} className={styles.img}/>
        <Button onClick={() => router.back()} type='button' className={styles.btn} styleType='large' color='green'>
          {t('404_page_button_back')}
        </Button>
      </div>

    </div>

  </Layout>
}
