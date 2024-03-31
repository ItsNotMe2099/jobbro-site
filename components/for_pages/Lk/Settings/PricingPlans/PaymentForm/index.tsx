import { Form, FormikProvider, useFormik } from 'formik'
import styles from './index.module.scss'
import InputField from '@/components/fields/InputField'
import SelectField from '@/components/fields/SelectField'
import { PlanType } from '@/data/enum/PlanType'
import { usePricingPlanSettingsContext } from '@/context/pricing_plan_settings_state'
import RadioField from '@/components/fields/RadioField'
import { BillingPeriod } from '@/data/enum/BillingPeriod'
import { useState } from 'react'
import Method from './Method'
import CardSvg from '@/components/svg/CardSvg'
import { colors } from '@/styles/variables'
import InvoiceSvg from '@/components/svg/InvoiceSvg'
import OrderSummary from '../OrderSummary'
import useTranslation from 'next-translate/useTranslation'
import Trial from '../Trial'

interface Props {

}

export interface FormData {
  plan: PlanType | null
  period: BillingPeriod
  postalCode: string
  country: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

export default function PaymentForm(props: Props) {

  const handleSubmit = async (data: FormData) => {

  }

  const { t } = useTranslation()

  const pricingPlanSettingsContext = usePricingPlanSettingsContext()

  const initialValues: FormData = {
    plan: pricingPlanSettingsContext.plan,
    period: BillingPeriod.Yearly,
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit
  })

  const getBillingPeriodTranslation = (period: BillingPeriod) => {
    switch (period) {
      case BillingPeriod.Yearly:
        return t('pricing_plans_plan_period_yearly')
      case BillingPeriod.Monthly:
        return t('pricing_plans_plan_period_monthly')
      case BillingPeriod.Three:
        return t('pricing_plans_plan_period_three')
    }
  }

  const radioOptions = [
    { label: getBillingPeriodTranslation(BillingPeriod.Yearly), value: BillingPeriod.Yearly },
    { label: getBillingPeriodTranslation(BillingPeriod.Three), value: BillingPeriod.Three },
    { label: getBillingPeriodTranslation(BillingPeriod.Monthly), value: BillingPeriod.Monthly },
  ]

  console.log(formik.values)

  const [method, setMethod] = useState<'card' | 'invoice'>('card')


  return (
    <FormikProvider value={formik}>
      <div className={styles.root}>
        <div className={styles.details}>
          <div className={styles.title}>{t('pricing_plans_payment_form_details')}</div>
          <Form className={styles.form}>
            <div className={styles.card}>
              <InputField classNameInputWrapper={styles.inputPlan} name='plan' label={'Plan'} disabled />
              <div className={styles.billing}>{t('pricing_plans_payment_form_billing_period')}</div>
              <RadioField name='period' options={radioOptions} />
            </div>
            <div className={styles.card}>
              <div className={styles.billing}>{t('pricing_plans_payment_form_payment_method')}</div>
              <div className={styles.choose}>
                <Method onClick={() => setMethod('card')} name={t('pricing_plans_plan_payment_method_card')}
                  icon={<CardSvg color={method === 'card' ? colors.green : colors.textPrimary} />}
                  active={method === 'card'} />
                <Method onClick={() => setMethod('invoice')} name={t('pricing_plans_plan_payment_method_invoice')}
                  icon={<InvoiceSvg color={method === 'invoice' ? colors.green : colors.textPrimary} />}
                  active={method === 'invoice'} />
              </div>
            </div>
            {method === 'card' ?
              <div className={styles.card}>
                <InputField classNameInputWrapper={styles.input} name='cardNumber' placeholder='Card number' />
                <div className={styles.line}>
                  <InputField classNameInputWrapper={styles.input} name='expiryDate' placeholder='Expiry date' />
                  <InputField classNameInputWrapper={styles.input} name='cvv' placeholder='CVV' />
                </div>
                <SelectField className={styles.select} name='country' options={[]} placeholder='Country' />
                <InputField classNameInputWrapper={styles.input} name='postalCode' placeholder='Postal Code' />
              </div>
              :
              <div className={styles.card}>

              </div>
            }
          </Form>
        </div>
        <div className={styles.right}>
          <OrderSummary plan={formik.values.plan as PlanType} period={formik.values.period} />
          <Trial />
        </div>
      </div>
    </FormikProvider>
  )
}
