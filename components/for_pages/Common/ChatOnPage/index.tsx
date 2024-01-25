import styles from './index.module.scss'
// import {RenderPropSticky} from 'react-sticky-el'
import {useRef, useState} from 'react'
import {usePosition} from '@ernestorb/useposition'
import {useWindowWidth} from '@react-hook/window-size'
import {useAppContext} from '@/context/state'
import {Nullable} from '@/types/types'
import ChatDialogWidget from '@/components/for_pages/Chat/ChatDialogWidget'
import classNames from 'classnames'

interface Props {
  vacancyId?: Nullable<number | undefined>
  cvId?: Nullable<number | undefined>
  title?: string | undefined
}

export default function ChatOnPage(props: Props) {
  const appContext = useAppContext()
  let ref = useRef<HTMLDivElement | null>(null)
  let position = usePosition(ref, {callOnResize: true})
  const windowWidth = useWindowWidth()
  const [showMobile, setShowMobile] = useState(false)
  return (
    <>
      <div ref={ref} className={classNames(styles.root, styles[appContext.headerDirection]) } >
            <ChatDialogWidget vacancyId={props.vacancyId} cvId={props.cvId} title={props.title}/>

      </div>
      {appContext.isMobile && !showMobile && null}
    </>
  )
}

