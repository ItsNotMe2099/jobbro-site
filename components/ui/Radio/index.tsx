import styles from './index.module.scss'
import classNames from 'classnames'
import RadioItem from './RadioItem'
import { IOption, RadioStyleType } from '@/types/types'

interface Props<T> {
  options: IOption<T>[],
  label?: string
  disabled?: boolean
  styleType: RadioStyleType
  errorClassName?: string
  setVal: (val: T | undefined) => void
  value: T
}

export default function RadioField<T>(props: Props<T>) {
  const {options, label, disabled} = props

  const handleCheckboxChanged = (value: T | undefined) => {
    if (disabled) {
      return
    }
    props.setVal(value)
  }

  return (
    <div className={classNames(styles.root, {
      [styles.styleTiles]: props.styleType === 'tile',
      [styles.styleRow]: props.styleType === 'row'
    })}>
      {props.label && <div className={classNames({
        [styles.label]: true,
      })}>{props.label}</div>}
      <div className={styles.list}>
      {options.map(item => (
          <RadioItem
          key={`${item.value}`}
            isActive={item.value === props.value}
            value={item}
            disabled={item.disabled}
            label={item.label}
            description={item.description}
            styleType={props.styleType}
            onChange={() => handleCheckboxChanged(item.value)}
          />
      ))}
      </div>
    </div>
  )
}
