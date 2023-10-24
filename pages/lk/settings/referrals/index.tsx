import { getAuthServerSideProps } from '@/utils/auth'
import { ProfileType } from '@/data/enum/ProfileType'
import { LkSettingsPageLayout } from '@/components/for_pages/Lk/Settings/LkSettingsyLayout'
import styles from './index.module.scss'
import Card from '@/components/for_pages/Common/Card'
import CopySvg from '@/components/svg/CopySvg'
import { colors } from '@/styles/variables'

interface Props {

}

const LkSettingsRefferalsPage = (props: Props) => {

  const handleCopy = () => {
    navigator.clipboard.writeText('test')
    alert('Copied to clipboard')
  }

  const stats = [
    { name: 'Clicks', desc: 'Companies that have clicked on your referral link.', stat: 0 },
    { name: 'Pending', desc: 'Companies that have signed up but havent created a job ad yet.', stat: 0 },
    { name: 'Completed', desc: 'Companies that have signed up and successfully posted a job ad.', stat: 0 },
    { name: 'Earned', desc: 'How much youve earned in credits.', stat: '$ 0.00' },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Card>
          <div className={styles.title}>
            Invite a company and earn €50
          </div>
          <div className={styles.text}>
            Earn €50 for every company you invite who successfully creates a job ad. They will also earn €25 worth of credit.
          </div>
        </Card>
        <Card>
          <div className={styles.title}>
            Use of credits
          </div>
          <div className={styles.text}>
            You can only use your credits to pay for premium job boards in the Jobbro store. You&apos;ll see your discounts in your cart.
          </div>
        </Card>
      </div>
      <Card title={'Share your link'}>
        <div className={styles.share} onClick={handleCopy}>
          <div className={styles.link}>
            https://jobbro.com/referral/818e02586ba65e6f5f
          </div>
          <div className={styles.copy}>
            <CopySvg color={colors.green} />
            <div className={styles.text}>Copy link</div>
          </div>
        </div>
        <div className={styles.text}>
          Sharing your codes or referral link on coupon/discount websites or forums is prohibited, and will result in loss of credit.
        </div>
      </Card>
      <Card>
        <div className={styles.cardTitle}>
          ReferraI stats
        </div>
        <div className={styles.text2}>
          Таке а look at the statistics for alI the companies that have used уоиг referraI link.
        </div>
        <div className={styles.stats}>
          {stats.map((i, index) =>
            <div className={styles.item} key={index}>
              <div className={styles.right}>
                <div className={styles.name}>
                  {i.name}
                </div>
                <div className={styles.desc}>
                  {i.desc}
                </div>
              </div>
              <div className={styles.stat}>{i.stat}</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

LkSettingsRefferalsPage.getLayout = LkSettingsPageLayout
export default LkSettingsRefferalsPage
export const getServerSideProps = getAuthServerSideProps(ProfileType.Employee)
