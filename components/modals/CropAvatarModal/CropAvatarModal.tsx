import ModalLayout from '@/components/layout/Modal/ModalLayout'
import styles from './index.module.scss'
import ModalBody from '@/components/layout/Modal/ModalBody'
import { useAppContext } from '@/context/state'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { Props, ICropAvatarModalProps, Avatar } from '.'

export default function CropAvatarModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as ICropAvatarModalProps
  // URL.createObjectURL(acceptedFiles[0])
  const imageString = URL.createObjectURL(args.image)
  const [croppedImage, setCroppedImage] = useState('')
  const [cropRadius, setCropRadius] = useState(50)
  console.log(args)

  useEffect(() => {
    console.log(cropRadius)


  }, [cropRadius])



  const body = (
    <div className={styles.root}>
      <div className={styles.avatar}>
        <Avatar
          image={FILES + imageString}
          width={300}
          height={300} />
      </div>
      <div className={styles.buttons}>
        <input type='range' min={10} max={100} value={cropRadius} onChange={(e) => setCropRadius(parseInt(e.target.value))} />
        <Button>Save</Button>
        <Button>Cancel</Button>
      </div>
    </div>
  )

  return (
    <ModalLayout>
      <ModalBody>
        {body}
      </ModalBody>
    </ModalLayout>
  )
}
