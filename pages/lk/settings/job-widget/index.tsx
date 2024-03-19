import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import Button from '@/components/ui/Button'
import CopySvg from '@/components/svg/CopySvg'
import { colors } from '@/styles/variables'
import Link from 'next/link'
import { Routes } from '@/types/routes'
import {HirerRole} from '@/data/enum/HirerRole'
import JobWidget from '@/components/ui/JobWidget'
import { useJobWidgetContext } from '@/context/job_widget_state'
import { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import showToast from '@/utils/showToast'

interface Props {

}

const LkSettingsJobWidgetsPage = (props: Props) => {
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [widgetHeight, setWidgetHeight] = useState<string>('')
  const {t} = useTranslation()
  const jobWidgetContext = useJobWidgetContext()
  const code = `<iframe src="${currentLocation}/job-widget/${jobWidgetContext.token||''}" height="${widgetHeight}" style="border: unset;"></iframe>`
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    showToast({title: t('toast_job_widget_copied_code')})
  }


  useEffect(()=>{
    jobWidgetContext.getWidget()
    const jobWidget: HTMLDivElement = document.getElementById('job-widget') as HTMLDivElement
    setWidgetHeight(jobWidget.clientHeight.toString())
  }, [])

  useEffect(()=>{
    if(jobWidgetContext.settings && jobWidgetContext.vacancies.size > 0) {
      setCurrentLocation(window.location.origin)
      const jobWidget: HTMLDivElement = document.getElementById('job-widget') as HTMLDivElement
      setWidgetHeight(jobWidget.clientHeight.toString())
    }
  }, [jobWidgetContext.settings, jobWidgetContext.vacancies])

  return (
    <div className={styles.root}>
        <Card>
        <div className={styles.title}>
          {t('settings_job_widget_title')}
        </div>
        <div className={styles.text}>
          {t('settings_job_widget_desc')}
        </div>
        <div className={styles.controls}>
          <Button className={styles.contact} styleType='small'>
            {t('settings_job_widget_contact_us')}
          </Button>
          <div className={styles.more}>
            {t('settings_job_widget_dont_show_more')}
          </div>
        </div>
      </Card>
      <JobWidget {...jobWidgetContext.settings} preview/>
      {jobWidgetContext.settings && jobWidgetContext.vacancies.size > 0 &&
      <Card title={t('settings_job_widget_embed_code')}>
        <pre className={styles.code}>
          {code}
        </pre>
        <div className={styles.controls}>
          <div className={styles.share} onClick={handleCopy}>
            <div className={styles.copy}>
              <CopySvg color={colors.green} />
              <div className={styles.text}>{t('settings_job_widget_copy_code')}</div>
            </div>
          </div>
          <Link href={Routes.lkSettingsConfigWidget} className={styles.more}>
            {t('settings_job_widget_configure')}
          </Link>
        </div>
      </Card>
      }
    </div>
  )
}

LkSettingsJobWidgetsPage.getLayout = LkSettingsPageLayout
export default LkSettingsJobWidgetsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
