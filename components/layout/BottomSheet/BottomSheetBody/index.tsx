import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function BottomSheetBody(props: Props) {
  const appContext = useAppContext()
  return (
    <div className={classNames(styles.root, props.className)}>
      {props.children}
    </div>
  )
}
