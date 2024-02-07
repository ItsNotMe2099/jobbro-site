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

interface Props {

}

const LkSettingsJobWidgetsPage = (props: Props) => {
  const [currentLocation, setCurrentLocation] = useState<string>('')


  const handleCopy = () => {
    navigator.clipboard.writeText('test')
    alert('Copied to clipboard')
  }

  const jobWidgetContext = useJobWidgetContext()

  useEffect(()=>{
    jobWidgetContext.getWidget()  
    setCurrentLocation(window.location.origin)
  }, [])






  return (
    <div className={styles.root}>
      <Card>
        <div className={styles.title}>
          Display jobs on your website
        </div>
        <div className={styles.text}>
          Use this configurator to customize a widget that displays the jobs from your Jobbro account on your website.
          Changes you make to these settings result in unique Embed Codes below, and you can create as many as you’d like. Then, insert each code into your website with a simple copy-paste. If you need support integrating the widget, we are happy to help!
        </div>
        <div className={styles.controls}>
          <Button className={styles.contact} styleType='small'>
            Contact Us
          </Button>
          <div className={styles.more}>
            Don’t show more
          </div>
        </div>
      </Card>
      <JobWidget {...jobWidgetContext.settings}/>
      <Card title={'Embed code'}>
        <pre className={styles.code}>
          {`<iframe src="${currentLocation}/job-widget/${jobWidgetContext.token||''}"></iframe>`}
          {/* &lt;div id=&apos;jobbro-widget&apos;&gt;&lt;script&gt;&lt;/script&gt;&lt;/div&gt; */}
          
        </pre>
        <div className={styles.controls}>
          <div className={styles.share} onClick={handleCopy}>
            <div className={styles.copy}>
              <CopySvg color={colors.green} />
              <div className={styles.text}>Copy code</div>
            </div>
          </div>
          <Link href={Routes.lkSettingsConfigWidget} className={styles.more}>
            Configure Widget
          </Link>
        </div>
      </Card>
    </div>
  )
}

LkSettingsJobWidgetsPage.getLayout = LkSettingsPageLayout
export default LkSettingsJobWidgetsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer, HirerRole.Admin)
