import styles from './index.module.scss'
import { RenderPropSticky } from 'react-sticky-el'
import { useAppContext } from '@/context/state'
import { usePosition } from '@ernestorb/useposition'
import { useWindowWidth } from '@react-hook/window-size'
import {ReactElement} from 'react'

export interface FormStickyFooterProps {
  boundaryElement: string
  formRef: React.RefObject<HTMLElement>

}
interface Props extends FormStickyFooterProps{
  children?: ReactElement | ReactElement[]
}

export default function PageStickyHeader(props: Props) {
  const appContext = useAppContext()
  const {isTabletWidth} = appContext.size
  let position = usePosition(props.formRef, { callOnResize: true })
  const windowWidth = useWindowWidth()
  const width = windowWidth - (position?.left ?? 0)
  return (
    <RenderPropSticky /*disabled={appContext.isMobile}*/ boundaryElement={props.boundaryElement}
      topOffset={-120}
      mode={'top'}
      isIOSFixEnabled={false}
      hideOnBoundaryHit={false}>
      {({ isFixed, wrapperStyles, wrapperRef, holderStyles, holderRef, ...rest }) => (
        <div {...rest} ref={holderRef} style={holderStyles}>
          <div
            {...rest}
            style={
              isFixed ?
                {
                  ...wrapperStyles,
                  transform: appContext.headerDirection === 'up' ? 'translate3d(0px, 120px, 0px)' : 'translate3d(0px, 0px, 0px)',
                  display: 'flex',
                  width: isTabletWidth?width:width - 32,
                  zIndex: 2,

                } :
                {
                  ...wrapperStyles,
                  width: isTabletWidth?width:width - 32,

                }
            }
            ref={wrapperRef}
            className={styles.transitioned}
          >
            <div className={styles.root}>
              {props.children}

            </div>
          </div>
        </div>

      )}
    </RenderPropSticky>
  )
}
