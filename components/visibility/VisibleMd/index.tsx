import styles from './index.module.scss'
import classNames from 'classnames'
import { isMdScreen } from 'utils/media'
import HiddenXs from 'components/visibility/HiddenXs'
import { useEffect, useState } from 'react'

interface Props {
  children: JSX.Element
  className?: string
}

export default function VisibleMd(props: Props): JSX.Element | null {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!isMdScreen()) {
      setHidden(true)
    }
  }, [])

  if (hidden) {
    return null
  }

  return (
    <HiddenXs>
      <div className={classNames([styles.root, props.className])}>
        {props.children}
      </div>
    </HiddenXs>
  )
}

