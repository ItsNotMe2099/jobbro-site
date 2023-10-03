import styles from './index.module.scss'
import {RenderPropSticky} from 'react-sticky-el'
import Button from '@/components/ui/Button'
import EyeSvg from '@/components/svg/EyeSvg'
import {colors} from '@/styles/variables'
import {useAppContext} from '@/context/state'
import {usePosition} from '@ernestorb/useposition'
import {useWindowWidth} from '@react-hook/window-size'

interface Props {
  boundaryElement: string
  formRef: React.RefObject<HTMLElement>
}

export default function FormStickyFooter(props: Props) {
  const appContext = useAppContext()
   let position = usePosition(props.formRef, {callOnResize: true})
  const windowWidth = useWindowWidth()
  return (
    <RenderPropSticky disabled={appContext.isMobile} boundaryElement={props.boundaryElement}
                      bottomOffset={0}
                      topOffset={-32}
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
                  transform: 'translateY(-32px)',
                  display: 'flex',
                  width: windowWidth - (position?.left ?? 0) -  32,
                  zIndex: 2,
                } :
                {
                  ...wrapperStyles,

                }
            }
            ref={wrapperRef}
          >
            <div className={styles.root}>
              <Button type='submit' styleType='large' color='green'>
                Publish
              </Button>
              <Button styleType='large' color='white'>
                Save Template
              </Button>
              <div className={styles.preview}>
                <EyeSvg color={colors.green} className={styles.eye} />
                <div className={styles.text}>Preview</div>
              </div>
            </div>
          </div>
        </div>

      )}
    </RenderPropSticky>
  )
}
