import styles from './index.module.scss'
import {RenderPropSticky} from 'react-sticky-el'
import {useRef, useState} from 'react'
import {usePosition} from '@ernestorb/useposition'
import {useWindowWidth} from '@react-hook/window-size'
import {useAppContext} from '@/context/state'
import {ChatSocketWrapper} from '@/context/chat_socket_state'
import {Nullable} from '@/types/types'
import ChatDialogWidget from '@/components/for_pages/Chat/ChatDialogWidget'

interface Props {
  vacancyId?: Nullable<number | undefined>
  cvId?: Nullable<number | undefined>
  title?: string | undefined
}

const ChatOnPageInner = (props: Props) => {
  const appContext = useAppContext()
  let ref = useRef<HTMLDivElement | null>(null)
  let position = usePosition(ref, {callOnResize: true})
  const windowWidth = useWindowWidth()
  const [showMobile, setShowMobile] = useState(false)
  return (
    <>
      <div ref={ref} className={styles.root}>
        <RenderPropSticky disabled={appContext.isMobile} boundaryElement={`.${styles.root}`}
                          bottomOffset={0}
                          topOffset={0}
                          mode={'bottom'}
                          isIOSFixEnabled={false}
                          hideOnBoundaryHit={false}>
          {({isFixed, wrapperStyles, wrapperRef, holderStyles, holderRef, ...rest}) => (
            <div {...rest} ref={holderRef} style={holderStyles}>
              <div
                {...rest}
                style={
                  isFixed ?
                    {
                      ...wrapperStyles,
                    //  transform: 'translateY(84px)',
                      display: 'flex',
                      height: 'calc(100vh - 84px)'
                    } :
                    {
                      ...wrapperStyles,
                    // transform: 'translateY(84px)',
                      display: 'flex',
                      height: 'calc(100vh - 84px)',
                    }
                }
                ref={wrapperRef}
              >
                <ChatDialogWidget vacancyId={props.vacancyId} cvId={props.cvId} title={props.title}/>
              </div>
            </div>

          )}
        </RenderPropSticky>
      </div>
      {appContext.isMobile && !showMobile && null}
    </>
  )
}

export default function ChatOnPage(props: Props) {
  return <ChatSocketWrapper>
    <ChatOnPageInner {...props}/>
  </ChatSocketWrapper>
}
