import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import {useAppContext} from 'context/state'
import {Scrollbars} from 'rc-scrollbars'

interface Props {
  fixed?: boolean
  children?: ReactElement | ReactElement[]
  id?: string
  className?: string
}

export default function SidePanelBody(props: Props) {
  const context = useAppContext()
  return (
    <div className={classNames(styles.root, {[styles.fixed]: props.fixed  || context.isMobile})}>
      <Scrollbars  autoHide autoHideTimeout={1000} universal>
        <div className={styles.wrapper}>
          {props.children}
        </div>
      </Scrollbars>
    </div>
  )
}
