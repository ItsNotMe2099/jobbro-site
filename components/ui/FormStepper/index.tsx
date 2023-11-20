import styles from './index.module.scss'
import {IFormStep} from 'types/types'
import {colors} from 'styles/variables'
import { Line } from 'rc-progress'
import {useMemo} from 'react'
interface Props<S> {
  steps: IFormStep<S>[]
  currentStep: S
}

export default function FormStepper<S>(props: Props<S>) {
  const currentIndex = useMemo(() => {
    return props.steps.findIndex(i => i.key === props.currentStep)
  }, [props.currentStep])
  return <div className={styles.root}>
    {props.steps.map((step, index) => <div key={`${step.key}`} className={styles.step}>
      <div className={styles.title}>{step.name}</div>
      <Line className={styles.progress}  percent={currentIndex >= index ? 100 : 0} trailWidth={1.5} strokeWidth={1.5} strokeColor={colors.green} trailColor={colors.grey} />
    </div>)}
  </div>
}

