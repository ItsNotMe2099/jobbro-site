import styles from './index.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { usePricingPlanSettingsContext } from '@/context/pricing_plan_settings_state'
import { PlanType } from '@/data/enum/PlanType'
import classNames from 'classnames'
import Button from '@/components/ui/Button'
import CheckSvg from '@/components/svg/CheckSvg'
import { colors } from '@/styles/variables'


interface Props {

}

export default function PricingPlanTable(props: Props) {

  const { t } = useTranslation()

  const pricingPlanSettingsContext = usePricingPlanSettingsContext()

  return (
    <div className={styles.root}>
      <div className={styles.title}>Plans</div>
      <div className={styles.table}>
        <div className={styles.tr}>
          <div className={styles.td} />
          <div className={classNames(styles.td, styles.type)}>
            {PlanType.Free}
          </div>
          <div className={classNames(styles.td, styles.type)}>
            {PlanType.Professional}
          </div>
          <div className={classNames(styles.td, styles.type)}>
            {PlanType.Enterprise}
          </div>
        </div>
        <div className={styles.tr}>
          <div className={styles.td} />
          <div className={classNames(styles.td, styles.price)}>
            $0 / mo
          </div>
          <div className={classNames(styles.td, styles.price)}>
            $99 / mo
          </div>
          <div className={classNames(styles.td, styles.price)}>
            $119 / mo
          </div>
        </div>
        <div className={styles.tr}>
          <div className={styles.td} />
          <div className={classNames(styles.td, styles.price)}>
            <Button onClick={() => pricingPlanSettingsContext.setPlan(PlanType.Free)}
              className={styles.btn} styleType='large' color={'white'}>
              {t('pricing_plans_select_plan_button')}
            </Button>
          </div>
          <div className={classNames(styles.td, styles.price)}>
            <Button onClick={() => pricingPlanSettingsContext.setPlan(PlanType.Professional)}
              className={styles.btn} styleType='large' color={'green'}>
              {t('pricing_plans_select_plan_button')}
            </Button>
          </div>
          <div className={classNames(styles.td, styles.price)}>
            <Button onClick={() => pricingPlanSettingsContext.setPlan(PlanType.Enterprise)}
              className={styles.btn} styleType='large' color={'green'}>
              {t('pricing_plans_select_plan_button')}
            </Button>
          </div>
        </div>
        <div className={styles.tr}>
          <div className={classNames(styles.td, styles.price, styles.head, styles.posted)}>
            Job posted
          </div>
          <div className={classNames(styles.td, styles.price)}>
            3
          </div>
          <div className={classNames(styles.td, styles.price)}>
            25
          </div>
          <div className={classNames(styles.td, styles.price)}>
            Unlimited
          </div>
        </div>
        <div className={styles.tr}>
          <div className={classNames(styles.td, styles.price, styles.head, styles.posted)}>
            Users
          </div>
          <div className={classNames(styles.td, styles.price)}>
            2
          </div>
          <div className={classNames(styles.td, styles.price)}>
            5
          </div>
          <div className={classNames(styles.td, styles.price)}>
            Unlimited
          </div>
        </div>
        <div className={styles.tr}>
          <div className={classNames(styles.td, styles.price, styles.head, styles.big)}>
            Features to improve your<br /> recruitments process
          </div>
          <div className={classNames(styles.td, styles.price)} />
          <div className={classNames(styles.td, styles.price)} />
          <div className={classNames(styles.td, styles.price)} />
        </div>
        <div className={styles.tr}>
          <div className={classNames(styles.td, styles.price, styles.head)} style={{ paddingTop: '8px' }}>
            AI-powered job description builder
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            <CheckSvg className={styles.sparks} color={colors.green} />
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            <CheckSvg className={styles.sparks} color={colors.green} />
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            <CheckSvg className={styles.sparks} color={colors.green} />
          </div>
        </div>
        <div className={styles.tr}>
          <div className={classNames(styles.td, styles.price, styles.head, styles.big)}>
            Save your time <span className={styles.perfect}>“Perfect Fit”</span>
          </div>
          <div className={classNames(styles.td, styles.price)} />
          <div className={classNames(styles.td, styles.price)} />
          <div className={classNames(styles.td, styles.price)} />
        </div>
        <div className={styles.tr}>
          <div className={classNames(styles.td, styles.price, styles.head)} style={{ paddingTop: '8px' }}>
            Profile scoring system
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            100 accounts
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            10 000 accounts
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            Unlimited
          </div>
        </div>
        <div className={styles.tr}>
          <div className={classNames(styles.td, styles.price, styles.head, styles.big)}>
            Organise your workflow
          </div>
          <div className={classNames(styles.td, styles.price)} />
          <div className={classNames(styles.td, styles.price)} />
          <div className={classNames(styles.td, styles.price)} />
        </div>
        <div className={styles.tr}>
          <div className={classNames(styles.td, styles.price, styles.head)} style={{ paddingTop: '8px' }}>
            ATS managefull access
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            <CheckSvg className={styles.sparks} color={colors.green} />
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            <CheckSvg className={styles.sparks} color={colors.green} />
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            <CheckSvg className={styles.sparks} color={colors.green} />
          </div>
        </div>
        <div className={styles.tr}>
          <div className={classNames(styles.td, styles.price, styles.head, styles.big)}>
            Keep all in one place
          </div>
          <div className={classNames(styles.td, styles.price)} />
          <div className={classNames(styles.td, styles.price)} />
          <div className={classNames(styles.td, styles.price)} />
        </div>
        <div className={styles.tr}>
          <div className={classNames(styles.td, styles.price, styles.head)} style={{ paddingTop: '8px' }}>
            CV Databased with import yours
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            <CheckSvg className={styles.sparks} color={colors.green} />
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            <CheckSvg className={styles.sparks} color={colors.green} />
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '8px' }}>
            <CheckSvg className={styles.sparks} color={colors.green} />
          </div>
        </div>
        <div className={styles.tr}>
          <div className={styles.td} />
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '50px' }}>
            <Button onClick={() => pricingPlanSettingsContext.setPlan(PlanType.Free)}
              className={styles.btn} styleType='large' color={'white'}>
              {t('pricing_plans_select_plan_button')}
            </Button>
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '50px' }}>
            <Button onClick={() => pricingPlanSettingsContext.setPlan(PlanType.Professional)}
              className={styles.btn} styleType='large' color={'green'}>
              {t('pricing_plans_select_plan_button')}
            </Button>
          </div>
          <div className={classNames(styles.td, styles.price)} style={{ paddingTop: '50px' }}>
            <Button onClick={() => pricingPlanSettingsContext.setPlan(PlanType.Enterprise)}
              className={styles.btn} styleType='large' color={'green'}>
              {t('pricing_plans_select_plan_button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
