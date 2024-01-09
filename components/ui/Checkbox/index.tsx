import styles from './index.module.scss'
import classNames from 'classnames'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'
import {MouseEventHandler} from 'react'


interface Props {
  checked: boolean
  showError?: boolean
  hover?: boolean
  style?: 'square' | 'circle'
  onClick?: MouseEventHandler
}

export default function Checkbox(props: Props) {
  return ( <div
    onClick={props.onClick}
  className={classNames({
    [styles.checkbox]: true,
    [styles.hover]: props.hover,
    [styles.checked]: props.checked,
    [styles.error]: props.showError,
    [styles.circle]: props.style === 'circle',
  })}
>
  {props.checked && <CheckBoxSvg />}
</div>)
}

