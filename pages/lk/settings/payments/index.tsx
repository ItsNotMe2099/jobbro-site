import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import { useSettingsContext } from '@/context/settings_state'
import CardSvg from '@/components/svg/CardSvg'
import { colors } from '@/styles/variables'
import Link from 'next/link'
import HistorySvg from '@/components/svg/HistorySvg'
import { Routes } from '@/types/routes'

interface Props {

}

const LkSettingsPaymentsPage = (props: Props) => {

  const settingsContext = useSettingsContext()

  return (
    <div className={styles.root}>
      <Card title={'Payment method'}>
        <div className={styles.wrapper}>
          {!settingsContext.paymentMethod &&
            <div className={styles.method}>
              <CardSvg color={colors.simpleGrey} />
              <div className={styles.text}>
                There&apos;s no payment method yet
              </div>
            </div>
          }
          <Link href={Routes.lkSettingsPaymentsMethod} className={styles.add}>
            Add method
          </Link>
        </div>
      </Card>
      <Card title={'Subscription'}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.text}>
              Free
            </div>
            <div className={styles.monthly}>
              $0.00 / monthly
            </div>
          </div>
        </div>
      </Card>
      <Card title={'History'}>
        {settingsContext.history.length === 0 &&
          <div className={styles.method}>
            <HistorySvg color={colors.textSecondary} />
            <div className={styles.text}>
              You do not have any transactions yet
            </div>
          </div>
        }
      </Card>
    </div>
  )
}

LkSettingsPaymentsPage.getLayout = LkSettingsPageLayout
export default LkSettingsPaymentsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
