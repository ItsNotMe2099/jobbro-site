import styles from './index.module.scss'
import {IAiCvRequest} from '@/data/interfaces/IAiCvRequest'
import { useAppContext } from '@/context/state'

interface Props {
  request: IAiCvRequest
}

export default function ApplyForJobReadyStep(props: Props) {
  const appContext = useAppContext()

  const onBtnClick = () => {
    appContext.hideModal()
  }

  return (
    <div className={styles.root}>
    <div className={styles.description}>
      The resume is ready. You can view it right now.
    </div>
    </div>
  )
}
