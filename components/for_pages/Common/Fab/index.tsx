import styles from './index.module.scss'
import classNames from 'classnames'
import AddSvg from '@/components/svg/AddSvg'
import { colors } from '@/styles/variables'

interface Props {
  className?: string
  onClick?: () => void
  active?: boolean
}

export default function Fab(props: Props) {

  return (
    <div onClick={props.onClick} className={classNames(styles.root, props.className)}>
      <AddSvg className={classNames({[styles.active]: props.active})} color={colors.white} />
    </div>
  )
}
