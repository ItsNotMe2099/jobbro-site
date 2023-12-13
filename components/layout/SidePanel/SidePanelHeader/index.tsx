import styles from './index.module.scss'
import classNames from 'classnames'
import { ReactElement } from 'react'
import { useAppContext } from 'context/state'
import CloseModalBtn from '@/components/ui/CloseModalBtn'
import {colors} from '@/styles/variables'

interface Props {
  onClose?: () => void
  onBackClick?: () => void
  title?: string
  children?: ReactElement | ReactElement[]
  showId?: boolean
  showBack?: boolean
  className?: string
}

export default function SidePanelHeader(props: Props) {
  const appContext = useAppContext()
  return (
    <div className={classNames(styles.root, props.className)}>

      <div className={styles.left}>
        {props.title && <div className={styles.title}>
          {props.title}
        </div>}

        {props.children}
      </div>
      <div className={styles.close}>
        <CloseModalBtn onClick={() => appContext.hidePanel()} color={colors.textSecondary} />
      </div>
    </div>
  )
}


