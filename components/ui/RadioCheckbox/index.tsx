import styles from './index.module.scss'
import classNames from 'classnames'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'


interface Props {
  checked: boolean

}

export default function RadioCheckbox(props: Props) {
  return (  <div className={classNames(styles.root, { [styles.active]: props.checked })}>
    {props.checked && <CheckBoxSvg className={styles.checkbox} />}
  </div>)
}

