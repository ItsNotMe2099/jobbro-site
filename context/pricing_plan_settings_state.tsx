import { createContext, useContext, useState } from 'react'
import { useAppContext } from '@/context/state'
import { PlanType } from '@/data/enum/PlanType'


interface IState {
  plan: PlanType | null
  setPlan: (plan: PlanType | null) => void
}

const PricingPlanSettingsContext = createContext<IState>({} as IState)

interface Props {
  children: React.ReactNode
}

export function PricingPlanSettingsWrapper(props: Props) {
  const appContext = useAppContext()
  const [plan, setPlan] = useState<PlanType | null>(null)

  const value: IState = {
    plan,
    setPlan: (plan) => {
      setPlan(plan)
    }
  }

  return (
    <PricingPlanSettingsContext.Provider value={value as IState}>
      {props.children}
    </PricingPlanSettingsContext.Provider>
  )
}

export function usePricingPlanSettingsContext() {
  return useContext(PricingPlanSettingsContext)
}
