import styles from './index.module.scss'
import classNames from 'classnames'

import { colors } from '@/styles/variables'
import PlusSvg from '@/components/svg/PlusSvg'

interface Props {
  className?: string
  onClick?: () => void
  active?: boolean
}

export default function Fab(props: Props) {

  return (
    <div onClick={props.onClick} className={classNames(styles.root, props.className)}>
      <PlusSvg className={classNames({[styles.active]: props.active})} color={colors.white} />
    </div>
  )
}
