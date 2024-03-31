import { createContext, useContext, useState } from 'react'
import { PlanType } from '@/data/enum/PlanType'


interface IState {
  plan: PlanType | null
  updatePlan: (plan: PlanType | null) => void
}

const defaultValue: IState = {
  plan: null,
  updatePlan: (plan: PlanType | null) => null
}

const PricingPlanSettingsContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function PricingPlanSettingsWrapper(props: Props) {

  const [plan, setPlan] = useState<PlanType | null>(null)

  const value: IState = {
    //...defaultValue,
    plan,
    updatePlan: (plan) => {
      setPlan(plan)
    },
  }

  return (
    <PricingPlanSettingsContext.Provider value={value}>
      {props.children}
    </PricingPlanSettingsContext.Provider>
  )
}

export function usePricingPlanSettingsContext() {
  return useContext(PricingPlanSettingsContext)
}
