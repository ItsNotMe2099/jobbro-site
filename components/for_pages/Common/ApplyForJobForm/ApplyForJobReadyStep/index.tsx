import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import {Routes} from '@/types/routes'
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
      <Button type='button' href={Routes.profileResumeEdit(props.request.cv!.id!)} onClick={onBtnClick} className={styles.btn} fluid
              styleType='large' color='green'>
        Show now
      </Button>
    </div>
  )
}
