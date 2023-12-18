import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import { Routes } from '@/types/routes'
import Link from 'next/link'
import DocSvg from '@/components/svg/DocSvg'
import SparksSvg from '@/components/svg/SparksSvg'
import classNames from 'classnames'
import {useTranslation} from 'next-i18next'

interface Props {
  className?: string
}

export default function MenuOptions(props: Props) {
  const { t } = useTranslation()
  return (
    <div className={classNames(styles.options, props.className)}>
      <Link href={Routes.lkJobsCreateJobManually} className={styles.option}>
        <DocSvg color={colors.green} />
        <div className={styles.desc}>
          <div className={styles.main}>
            {t('new_job_dropdown_create_manually')}
          </div>
          <div className={styles.text}>
            {t('new_job_dropdown_manual_desc')}
          </div>
        </div>
      </Link>
      <Link href={Routes.lkJobsCreateJobAi} className={styles.option}>
        <SparksSvg color={colors.green} />
        <div className={styles.desc}>
          <div className={styles.main}>
            {t('new_job_dropdown_create_ai')}
          </div>
          <div className={styles.text}>
            {t('new_job_dropdown_ai_desc')}
          </div>
        </div>
      </Link>
    </div>
  )
}
