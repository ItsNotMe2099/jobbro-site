import styles from './index.module.scss'
import classNames from 'classnames'
import { ReactElement } from 'react'
import { useAppContext } from 'context/state'
import {colors} from '@/styles/variables'
import CloseModalBtn from '@/components/ui/CloseModalBtn'

interface Props {
  onClose?: () => void
  onBackClick?: () => void
  title?: string
  children?: ReactElement | ReactElement[]
  showId?: boolean
  showBack?: boolean
  className?: string
}

export default function ModalHeader(props: Props) {
  const appContext = useAppContext()
  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.close}>
        <CloseModalBtn onClick={() => appContext.hideModal()} color={colors.textSecondary} />
      </div>
      <div className={styles.left}>
        {(props.showBack)  &&
        <div className={styles.back}
             onClick={props.onBackClick}>
          <img src='/img/icons/back.svg' alt=''/>
        </div>}
        {props.title && <div className={styles.title}>
          {props.title}
        </div>}

        {props.children}
      </div>

    </div>
  )
}


