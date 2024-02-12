import styles from './index.module.scss'
import {IAiCvRequest} from '@/data/interfaces/IAiCvRequest'
import { useAppContext } from '@/context/state'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  request: IAiCvRequest
}

export default function ApplyForJobReadyStep(props: Props) {
  const appContext = useAppContext()
  const {t} = useTranslation()
  const onBtnClick = () => {
    appContext.hideModal()
  }

  return (
    <div className={styles.root}>
    <div className={styles.description}>
      {t('job_apply_form_type_show_cv_desc')}
    </div>
    </div>
  )
}
