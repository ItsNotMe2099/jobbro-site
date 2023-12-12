import styles from './index.module.scss'
import classNames from 'classnames'
import { useState } from 'react'
import DropzoneOverlay from 'components/fields/Files/components/DropzoneOverlay'
import { DropEvent, DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone'
import StickyFab from '@/components/for_pages/Common/StickyFab'
import Fab from '@/components/for_pages/Common/Fab'


interface Props extends DropzoneOptions {
  className?: string
  boundaryElement: string
  containerRef: React.RefObject<HTMLElement>
}

export default function AiCvRequestDropzone(props: Props) {
  const [error, setError] = useState<string | null>(null)
  const onDropRejected = (fileRejections: FileRejection[], event: DropEvent) => {
    console.log('fileRejections', fileRejections, props)
    if (fileRejections.length > 0 && fileRejections[0].errors.length > 0) {
      setError(fileRejections[0].errors[0].message)
    }
  }
  const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
    ...props,
    onDropRejected,
  } as any)
  return (
    <div className={classNames(styles.root, props.className)} {...getRootProps()}>

      <StickyFab boundaryElement={props.boundaryElement} containerRef={props.containerRef}
                 onClick={() => {}}>
        <>
        <input {...getInputProps()} />
        <Fab active={false}/>
        </>
      </StickyFab>

      {error && <div className={styles.error}>{error}</div>}
      {isDragActive && <DropzoneOverlay show={isDragActive} title={'Загрузить фото'} />}
    </div>
  )
}

