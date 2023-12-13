import styles from 'components/fields/Files/components/DropzoneOverlay/index.module.scss'
import classNames from 'classnames'


interface Props {
  show?: boolean
  title?: string
}

export default function DropzoneOverlay(props: Props) {
  return (
    <div className={classNames(styles.root, {[styles.show] : props.show})}>
      {props.title ?? 'Загрузить фото'}
    </div>
  )
}

