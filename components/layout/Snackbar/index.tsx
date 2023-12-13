import styles from 'components/layout/Snackbar/index.module.scss'
import { useAppContext } from '@/context/state'
import classNames from 'classnames'
import { SnackbarType } from '@/types/enums'

interface Props {}

export default function Snackbar(props: Props) {
  const appContext = useAppContext()
  console.log('SnackBar', appContext.snackbar?.text)
  return (
    <div className={classNames({
      [styles.root]: true,
      [styles.active]: appContext.snackbar,
      [styles.error]: appContext.snackbar?.type == SnackbarType.error,
      [styles.success]: appContext.snackbar?.type == SnackbarType.success,
    })}>
      {appContext.snackbar?.text}
    </div>
  )
}

