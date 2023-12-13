import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function BottomSheetFooter(props: Props) {
  return (
    <div className={classNames(styles.root, props.className)}>
      {props.children}
    </div>
  )
}
