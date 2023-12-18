import styles from './index.module.scss'

import ModalLayout from '@/components/layout/Modal/ModalLayout'
import ModalBody from '@/components/layout/Modal/ModalBody'
import { useAppContext } from '@/context/state'
import { useRef, useState } from 'react'
import Button from '@/components/ui/Button'
// import dynamic from 'next/dynamic'
import classNames from 'classnames'
import AvatarEditor from 'react-avatar-editor'
// export const Avatar = dynamic(() => import('react-avatar-editor'), { ssr: false })

export interface Props {
  isBottomSheet?: boolean
  onClose?: () => void
}

export interface ICropAvatarModalProps {
  image: string|File,
  onEdit: (image: File) => void
} 


export default function CropAvatarModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as ICropAvatarModalProps
  const editorRef = useRef<AvatarEditor>(null!)
  const [cropRadius, setCropRadius] = useState(100)

  const sendImage = () => {
    const canvasScaled = editorRef.current
    const dataUrl = canvasScaled.getImage()
    dataUrl.toBlob(blob=> {
      const file = new File([blob as Blob], 'avatar.png')
      args.onEdit(file)
      props.onClose&&props.onClose()
    })
  }

  const body = (
    <div className={styles.root}>
      <div className={styles.avatar} id='avatar'>
      <AvatarEditor 
      //@ts-ignore 
      ref={(e) => editorRef.current = e}
      image={args.image}
      crossOrigin='anonymous'
      scale={cropRadius/100}
      width={288}
      borderRadius={300}
      color={[255, 255, 255, 0.6]} 
      backgroundColor={'#0a0a0a30'}
      height={290} />
      </div>
      <div className={styles.navigation}>
        <p className={styles.description}>
          <span onClick={(e) => setCropRadius(cropRadius > 50 ? cropRadius - 10 : cropRadius)}>-</span>
          <span onClick={(e) => setCropRadius(cropRadius < 200 ? cropRadius + 10 : cropRadius)}>+</span>
        </p>
        <input type='range' min={50} max={200} value={cropRadius} onChange={(e) => setCropRadius(parseInt(e.target.value))} />
      </div>
      <Button className={styles.button} styleType={'large'} color={'green'}  onClick={() => {sendImage()}}>Save</Button>
      <Button className={classNames(styles.button, styles.buttonBordered)} styleType={'large'} color={'green'}  onClick={props.onClose}>Cancel</Button>   
    </div>
  )

  return (
    <ModalLayout className={styles.modalLayout}>
      <ModalBody>
        {body}
      </ModalBody>
    </ModalLayout>
  )
}
