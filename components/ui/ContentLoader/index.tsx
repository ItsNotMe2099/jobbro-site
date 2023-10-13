import styles from './index.module.scss'
import classNames from 'classnames'

import Spinner from 'components/ui/Spinner'

interface Props {
  className?: string
  style?: 'fullscreen' | 'block' | 'infiniteScroll' | 'page'
  isOpen?: boolean
}

export default function ContentLoader(props: Props) {
  return (
    <div className={classNames(styles.root, props.className, {
      [styles.fullscreen]: props.style === 'fullscreen',
      [styles.page]: props.style === 'page',
      [styles.block]: props.style === 'block',
      [styles.infiniteScroll]: props.style === 'infiniteScroll',
      [styles.open]: props.isOpen})}>
      <Spinner size={32} />
    </div>
  )
}
