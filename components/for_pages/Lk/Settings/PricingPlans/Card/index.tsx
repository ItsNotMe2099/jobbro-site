import { PlanType } from '@/data/enum/PlanType'
import styles from './index.module.scss'
import classNames from 'classnames'
import SparksSvg from '@/components/svg/SparksSvg'
import { colors } from '@/styles/variables'
import CheckSvg from '@/components/svg/CheckSvg'
import Button from '@/components/ui/Button'
import useTranslation from 'next-translate/useTranslation'
import { usePricingPlanSettingsContext } from '@/context/pricing_plan_settings_state'
import StarSvg from '@/components/svg/StarSvg'
import { Routes } from '@/types/routes'

interface IPlan {
  type: PlanType
  price: string
  jobsPosted: string
  users: string
  accounts: string
  monthly: string
}

interface Props {
  plan: IPlan
  best?: boolean
}

export default function PricingPlanCard({ plan, best }: Props) {

  const { t } = useTranslation()

  const pricingPlanSettingsContext = usePricingPlanSettingsContext()

  const items = [
    { svg: <SparksSvg className={styles.sparks} color={colors.green} />, text: <div className={styles.text}>AI-powered job description<br /> builder</div> },
    { svg: <CheckSvg className={styles.sparks} color={colors.green} />, text: <div className={styles.text}>ATS managefull access</div> },
    { svg: <CheckSvg className={styles.sparks} color={colors.green} />, text: <div className={styles.text}>CV Database with import yours</div> },
  ]

  return (
    <div className={classNames(styles.root, {
      [styles.best]: best,
      [styles.free]: plan.type === PlanType.Free,
      [styles.enterprise]: plan.type === PlanType.Enterprise
    })}>
      {best && <div className={styles.bestChoice}>
        <StarSvg className={styles.sparks} color={colors.white} filled />
        <div className={styles.text}>Best choice</div>
      </div>}
      <div className={styles.name}>
        {plan.type}
      </div>
      <div className={styles.price}>
        ${plan.price}{plan.type !== PlanType.Free && <span> / mo</span>}
      </div>
      <div
        className={classNames(styles.billed,
          { [styles.visible]: plan.type !== PlanType.Free })}>billed annually or <span>{plan.monthly}</span> monthly</div>
      <div className={styles.cons}>
        <div className={styles.jobs}>{plan.jobsPosted}</div>
        <div className={styles.users}>{plan.users}</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.features}>Features to improve your<br /> recruitments process</div>
        <div className={styles.scoring}>
          <div className={styles.perfect}>
            “Perfect Fit”
          </div>
          <div className={styles.system}>
            Profile scoring system<br /> <span>{plan.accounts}</span>
          </div>
        </div>
        <div className={styles.list}>
          {items.map((i, index) =>
            <div key={index} className={styles.item}>
              {i.svg}
              {i.text}
            </div>
          )}
        </div>
      </div>
      <Button href={Routes.lkSettingsPricingPlansPayment} onClick={() => pricingPlanSettingsContext.setPlan(plan.type)}
        className={styles.btn} styleType='large' color={plan.type !== PlanType.Free ? 'green' : 'white'}>
        {t('pricing_plans_select_plan_button')}
      </Button>
    </div>
  )
}
