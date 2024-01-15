import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import { Routes } from '@/types/routes'
import Link from 'next/link'
import DocSvg from '@/components/svg/DocSvg'
import SparksSvg from '@/components/svg/SparksSvg'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
import { useEffect, useRef } from 'react'

interface Props {
  className?: string
  onClick: () => void
  isActive?: boolean
}

export default function MenuOptions(props: Props) {
  const { t } = useTranslation()
  const optionsRef = useRef(null!)
  const [active, setActive] = useDetectOutsideClick(optionsRef.current, true)

  useEffect(()=>{
    !active &&props.onClick()
  }, [active])

  useEffect(()=>{
    if(props.isActive !== undefined) {
      setActive(props.isActive)  
    }
  }, [props.isActive])



  return (
    <div className={classNames(styles.options, props.className, active && styles.active)} ref={optionsRef}>
      <Link href={Routes.lkJobsCreateJobManually}  onClick={()=>props.onClick} className={styles.option}>
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
      <Link href={Routes.lkJobsCreateJobAi} className={styles.option} onClick={props.onClick}>
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
