import CloseSvg from 'components/svg/CloseSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import classNames from 'classnames'

interface Props {
  text: string
  onRemove?: () => void
  removable?: boolean
  active?: boolean
  className?: string
  onClick?: () => void
}

export default function ItemWithText(props: Props) {

  return (<p onClick={props.onClick} className={classNames(styles.item, { [styles.active]: props.active }, props.className)}>
    {props.text} {props.removable && <CloseSvg color={colors.textSecondary} onClick={props.onRemove} />}
  </p>)
}