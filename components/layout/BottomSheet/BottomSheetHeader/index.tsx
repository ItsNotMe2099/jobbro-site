import styles from './index.module.scss'
import {ReactElement} from 'react'
import classNames from 'classnames'
import {useAppContext} from '@/context/state'
import CloseModalBtn from '@/components/ui/CloseModalBtn'
import {colors} from '@/styles/variables'

interface Props {
  children?: React.ReactNode
  title?: string
  suffix?: ReactElement | null
  className?: string
}

export default function BottomSheetHeader(props: Props) {
  const appContext = useAppContext()
  return (
    <div className={classNames(styles.root, {[styles.withSuffix]: !!props.suffix}, props.className)}>
      {props.children && props.children}
      {!props.children && props.title && <><div className={styles.title}>{props.title}</div>
      {props.suffix && <div className={styles.suffix}>{props.suffix}</div>}
        <CloseModalBtn
          onClick={() => {
            if(appContext.bottomSheetOnTop){
              appContext.hideBottomSheetOnTop()
            }else {
              appContext.hideBottomSheet()
            }
          }}
          defaultPosition
          className={styles.close}
          color={colors.textSecondary}
        />
      </>}
    </div>
  )
}
