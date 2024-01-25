import styles from 'components/fields/Files/components/DropzoneOverlay/index.module.scss'
import classNames from 'classnames'
import {useMemo} from 'react'
import useTranslation from 'next-translate/useTranslation'


interface Props {
  show?: boolean
  title?: string
  isImage?: boolean | undefined
  isMulti?: boolean | undefined
}

export default function DropzoneOverlay(props: Props) {
  const {t} = useTranslation()
  const dropZoneText = useMemo(() => {
    if(props.isImage){
      return props.isMulti ? t('form_field_file_image_drag_drop_multi') : t('form_field_file_image_drag_drop')
    }else{
      return props.isMulti ? t('form_field_file_file_drag_drop_multi') : t('form_field_file_file_drag_drop_multi')
    }
  }, [props.isImage, props.isMulti])
  return (
    <div className={classNames(styles.root, {[styles.show] : props.show})}>
     <div className={styles.title}> {props.title ?? dropZoneText}</div>
    </div>
  )
}

