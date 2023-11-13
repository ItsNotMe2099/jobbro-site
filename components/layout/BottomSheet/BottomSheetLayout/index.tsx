import styles from './index.module.scss'
import Sheet from 'react-modal-sheet'
import { useAppContext } from 'context/state'
import { colors } from 'styles/variables'
import CloseModalBtn from 'components/ui/CloseModalBtn'


interface Props {
  children: React.ReactNode
  lineOver?: boolean
  closeIconColor?: string,
  backgroundColor? : string

}

export default function BottomSheetLayout(props: Props) {
  const appContext = useAppContext()
  return (
    <>
      <Sheet.Container style={{ background: props.backgroundColor ? props.backgroundColor: colors.white, borderRadius: '10px 10px 0 0' }}>
        <Sheet.Content dragListener={false}>
          <div className={styles.root}>
            <Sheet.Header style={{ position: props.lineOver ? 'absolute' : 'static', zIndex: 1 }} />
            <div className={styles.content}>
              {props.children}
            </div>
            {!appContext.modalNonSkippable && <CloseModalBtn
            onClick={() => { appContext.hideBottomSheet() }}
            defaultPosition
            color={props.closeIconColor ?? colors.black}
          />}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => { appContext.hideBottomSheet() }} />
    </>
  )
}

