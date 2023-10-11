import CloseSvg from '@/components/svg/CloseSvg'
import styles from 'components/layout/Layout/SidePanel/index.module.scss'
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

  const handleClose = () => {
    appContext.hidePanel()
    if (appContext.isOverlayShown) {
      appContext.hideOverlay()
    }
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.top}>
        <div className={styles.title}>
          {props.title}
        </div>
        <CloseSvg className={styles.close} onClick={handleClose} color={colors.textSecondary} />
      </div>
      {props.content}
    </div>
  )
}
