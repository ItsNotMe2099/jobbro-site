import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'
import { useState } from 'react'
import SocialSharingForm from '@/components/for_pages/Lk/Settings/SocialSharing/Form'

interface Props {

}

const LkSettingsSocialSharingPage = (props: Props) => {

  const [color, setColor] = useState<string>('#EBEBEB')

  return (
    <div className={styles.root}>
      <SocialSharingForm color={color} onChange={setColor} />
    </div>
  )
}

LkSettingsSocialSharingPage.getLayout = LkSettingsPageLayout
export default LkSettingsSocialSharingPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Hirer)
