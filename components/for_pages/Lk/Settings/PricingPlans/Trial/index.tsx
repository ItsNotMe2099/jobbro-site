import TrialStarSvg from '@/components/svg/TrialStarSvg'
import styles from './index.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { colors } from '@/styles/variables'
import TrialBellSvg from '@/components/svg/TrialBellSvg'
import { add, format } from 'date-fns'
import TrialCardSvg from '@/components/svg/TrialCardSvg'
import Item from './Item'

interface Props {

}

export default function Trial(props: Props) {

  const { t } = useTranslation()

  const items = [
    {
      icon: <TrialStarSvg color={colors.green} />, title: t('pricing_plans_payment_trial_title_30_days'),
      text: t('pricing_plans_payment_trial_text_30_days')
    },
    {
      icon: <TrialBellSvg color={colors.green} />, title: t('pricing_plans_payment_trial_title_end',
        { date: format(add(new Date, { days: 30 }), 'MMMM dd, yyyy') }),
      text: t('pricing_plans_payment_trial_text_end')
    },
    {
      icon: <TrialCardSvg color={colors.green} />, title: t('pricing_plans_payment_trial_title_new_sub',
        { date: format(add(new Date, { days: 33 }), 'MMMM dd, yyyy') }),
      text: t('pricing_plans_payment_trial_text_new_sub')
    },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {t('pricing_plans_payment_trial')}
      </div>
      <div className={styles.items}>
        {items.map((i, index) =>
          <Item icon={i.icon} title={i.title} text={i.text} last={index + 1 === items.length} key={index} />
        )}
      </div>
    </div>
  )
}
