import styles from './index.module.scss'
import IconButton from 'components/ui/IconButton'
import { MouseEventHandler } from 'react'
import classNames from 'classnames'
import { colors } from 'styles/variables'
import CloseSvg from '@/components/svg/CloseSvg'

interface Props {
  onClick: MouseEventHandler
  defaultPosition?: boolean
  color?: string
  className?: string
}

export default function CloseModalBtn(props: Props) {
  return (
    <IconButton onClick={props.onClick} className={classNames({
      [styles.root]: true,
      [styles.defaultPosition]: props.defaultPosition,
    }, props.className)}>
      <CloseSvg color={props.color ?? colors.textSecondary} />
    </IconButton>
  )
}

