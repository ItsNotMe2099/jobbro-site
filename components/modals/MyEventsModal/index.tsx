import styles from './index.module.scss'
import {useAppContext} from '@/context/state'
import BottomSheetLayout from '@/components/layout/BottomSheet/BottomSheetLayout'
import BottomSheetBody from '@/components/layout/BottomSheet/BottomSheetBody'
import {MyEvents} from '@/components/for_pages/Calendar/MyEvents'

interface Props {
  isBottomSheet?: boolean
}


export default function MyEventsModal(props: Props) {
  const appContext = useAppContext()

  return (<BottomSheetLayout>
    <BottomSheetBody className={styles.modalBody}>
     <MyEvents/>
    </BottomSheetBody>
  </BottomSheetLayout>)
}
