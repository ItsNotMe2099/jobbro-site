import { useAppContext } from 'context/state'
import {ReactElement} from 'react'

interface Props {
  children: ReactElement | null
}

/**
 * Shows child elements on all screens except mobile (XS)
 */
export default function HiddenXs(props: Props): JSX.Element | null {
  const appContext = useAppContext()

  if (appContext.isDesktop) {
    return props.children
  }
  return null
}

