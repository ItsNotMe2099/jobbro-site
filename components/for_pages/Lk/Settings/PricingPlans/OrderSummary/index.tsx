import { PlanType } from '@/data/enum/PlanType'
import styles from './index.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { BillingPeriod } from '@/data/enum/BillingPeriod'
import { PlanTypeMonthlyCost } from '@/data/enum/PlanTypeCost'
import { BillingPeriodInMonth } from '@/data/enum/BillingPeriodInMonth'
import { add, format } from 'date-fns'
import Button from '@/components/ui/Button'

interface Props {
  plan: PlanType
  period: BillingPeriod
}

export default function OrderSummary(props: Props) {

  const { t } = useTranslation()

  const getPeriodText = (period: BillingPeriod) => {
    switch (period) {
      case BillingPeriod.Yearly:
        return '1 Year'
      case BillingPeriod.Three:
        return '3 months'
      case BillingPeriod.Monthly:
        return '1 month'
    }
  }

  const getPeriodInMonth = (period: BillingPeriod) => {
    switch (period) {
      case BillingPeriod.Yearly:
        return +BillingPeriodInMonth.Yearly
      case BillingPeriod.Three:
        return +BillingPeriodInMonth.Three
      case BillingPeriod.Monthly:
        return +BillingPeriodInMonth.Monthly
    }
  }

  const getPlanCost = (plan: PlanType, period: BillingPeriod) => {
    switch (plan) {
      case PlanType.Free:
        return '0'
      case PlanType.Professional:
        return +PlanTypeMonthlyCost.Professional * getPeriodInMonth(period)
      case PlanType.Enterprise:
        return +PlanTypeMonthlyCost.Enterprise * getPeriodInMonth(period)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.title}>
          {t('pricing_plans_payment_order_summary')}
        </div>
        <div className={styles.top}>
          <div>{props.plan}× {getPeriodText(props.period)}</div>
          <div>${getPlanCost(props.plan, props.period)}</div>
        </div>
        <div className={styles.separator} />
        <div className={styles.reminder}>
          <div>{t('pricing_plans_payment_order_summary_due_on')} {format(add(new Date, { days: 33 }), 'MMMM dd yyyy')}</div>
          <div>${getPlanCost(props.plan, props.period)}</div>
        </div>
        <div className={styles.reminder}>
          <div>{t('pricing_plans_payment_order_summary_due_today')}</div>
          <div>$0</div>
        </div>
      </div>
      <Button
        className={styles.btn} styleType='large' color={'green'}>
        {t('pricing_plans_payment_order_summary_button')}
      </Button>
    </div>
  )
}
