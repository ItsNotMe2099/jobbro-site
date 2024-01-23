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
        {/* <RenderPropSticky disabled={appContext.isMobile} boundaryElement={'#chatOnPageRoot'}
                          bottomOffset={0}
                          topOffset={-82}
                          mode={'top'}
                          isIOSFixEnabled={false}
                          hideOnBoundaryHit={false}>
          {({isFixed, wrapperStyles, wrapperRef, holderStyles, holderRef, ...rest}) => (
            <div {...rest} ref={holderRef} style={holderStyles} data-el={`.${styles.root}`}>
              <div
              className={styles.holder}
                {...rest}
                style={
                  isFixed ?
                    {
                      ...wrapperStyles,
                    //  transform: 'translateY(84px)',
                      // transform: `translateY(${appContext.headerDirection === 'down' ? '32px': '124px'}`,
                      top: appContext.headerDirection === 'down'?'32px':'124px',
                      display: 'flex',
                      height: `calc(100vh - ${appContext.headerDirection === 'down'?138: 204}px)`,
                    } :
                    {
                      ...wrapperStyles,

                    // transform: 'translateY(84px)',
                      display: 'flex',
                      height: 'calc(100vh - 135px)',
                    }
                }
                ref={wrapperRef}
              > */}
                <ChatDialogWidget vacancyId={props.vacancyId} cvId={props.cvId} title={props.title}/>
              {/* </div>
            </div>

          )}
        </RenderPropSticky> */}
      </div>
      {appContext.isMobile && !showMobile && null}
    </>
  )
}

