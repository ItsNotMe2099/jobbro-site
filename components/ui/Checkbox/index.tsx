import styles from './index.module.scss'
import classNames from 'classnames'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'


interface Props {
  checked: boolean
  showError?: boolean
  hover?: boolean
}

export default function Checkbox(props: Props) {
  return ( <div
  className={classNames({
    [styles.checkbox]: true,
    [styles.hover]: props.hover,
    [styles.checked]: props.checked,
    [styles.error]: props.showError,
  })}
>
  {props.checked && <CheckBoxSvg />}
</div>)
}

