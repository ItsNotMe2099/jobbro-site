import CloseSvg from '@/components/svg/CloseSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import { useAppContext } from '@/context/state'
import { ReactElement } from 'react'


interface Props {
  title: string
  className?: string
  content: ReactElement
}

export default function SidePanel(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.top}>
        <div className={styles.title}>
          {props.title}
        </div>
        <CloseSvg className={styles.close} onClick={appContext.hidePanel} color={colors.textSecondary} />
      </div>
      {props.content}
    </div>
  )
}
