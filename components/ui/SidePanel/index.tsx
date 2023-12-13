import styles from '@/components/ui/SidePanel/index.module.scss'
import classNames from 'classnames'
import { useAppContext } from '@/context/state'
import { ReactElement } from 'react'


interface Props {
  className?: string
  children: ReactElement
}

export default function SidePanel(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={classNames(styles.root, props.className)}>
      {props.children}
    </div>
  )
}
