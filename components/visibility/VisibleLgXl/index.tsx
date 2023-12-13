import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { isLgScreen } from 'utils/media'
import HiddenXs from 'components/visibility/HiddenXs'
import classNames from 'classnames'

interface Props {
  children: JSX.Element
  className?: string
}

export default function VisibleLgXl(props: Props): JSX.Element | null {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!isLgScreen()) {
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

