import styles from './index.module.scss'
import { RenderPropSticky } from 'react-sticky-el'
import { useAppContext } from '@/context/state'
import { usePosition } from '@ernestorb/useposition'
import { useWindowWidth } from '@react-hook/window-size'
import { ReactElement } from 'react'

interface Props {
  boundaryElement: string
  formRef: React.RefObject<HTMLElement>
  onPreview?: () => void
  preview?: boolean
  btns?: ReactElement | ReactElement[]
}

export default function ControlsStickyFooter(props: Props) {
  const appContext = useAppContext()
  let position = usePosition(props.formRef, { callOnResize: true })
  const windowWidth = useWindowWidth()
  return (
    <RenderPropSticky disabled={appContext.isMobile} boundaryElement={props.boundaryElement}
      bottomOffset={0}
      topOffset={-32}
      mode={'bottom'}
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
                  transform: 'translateY(-32px)',
                  display: 'flex',
                  width: windowWidth - (position?.left ?? 0) - 32,
                  zIndex: 2,
                } :
                {
                  ...wrapperStyles,

                }
            }
            ref={wrapperRef}
          >
            <div className={styles.root}>
              {props.btns}
            </div>
          </div>
        </div>

      )}
    </RenderPropSticky>
  )
}
