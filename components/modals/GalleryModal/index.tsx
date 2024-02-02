import styles from './index.module.scss'
import IFile from '@/data/interfaces/IFile'
import { useAppContext } from '@/context/state'
import ModalLayout from '@/components/layout/Modal/ModalLayout'
import ModalBody from '@/components/layout/Modal/ModalBody'
import { useState } from 'react'
import ImageHelper from '@/utils/ImageHelper'
import IconButton from '@/components/ui/IconButton'
import CloseSvg from '@/components/svg/CloseSvg'
import { colors } from '@/styles/variables'
import ArrowSvg from '@/components/svg/ArrowSvg'
import DownloadSvg from '@/components/svg/DownloadSvg'
import RotateSvg from '@/components/svg/RotateSvg'

interface Props {
  onClose: () => void
}

export interface GalleryModalArguments {
  images: IFile[]
  title: string
  selectedId: number
}

export default function GalleryModal(props: Props) {
  const appContext = useAppContext()
  const args: GalleryModalArguments = appContext.modalArguments
  const [selectedImage, setSelectedImage] = useState<IFile>(args.images.find(i => i.id === args.selectedId)||args.images[0])
  const rotations = [0, 90, 180, 270]
  const [rotate, setRotate] = useState(0)

  const nextImage = () => {
    const index = args.images.indexOf(selectedImage)
    if(index < args.images.length - 1){
      setSelectedImage(args.images[index+1])
    }
  }

  const prevImage = () => {
    const index = args.images.indexOf(selectedImage)
    if(index > 0){
      setSelectedImage(args.images[index-1])
    }
  }


  // TODO сделать так, чтобы картинка замостилась в контейнер полностью при повороте
  const rotateImage = () => {
    const index = rotations.indexOf(rotate)
    if(index < rotations.length - 1){
      setRotate(rotations[index+1])
    }
    else {
      setRotate(rotations[0])
    }
  }

  const body = (
    <div className={styles.root}>
      <IconButton className={styles.closeButton} onClick={props.onClose}><CloseSvg color={colors.simpleGrey}/></IconButton>
      <img src={ImageHelper.urlFromSource(selectedImage.source)} style={{rotate: rotate+'deg'}} className={styles.image} alt='galleryImage'/>
      <div className={styles.buttonsWrapper}>
        <IconButton bgColor={'grey'} onClick={prevImage}><ArrowSvg direction={'left'} color={colors.black}/></IconButton>
        <IconButton bgColor={'grey'} onClick={nextImage}><ArrowSvg direction={'right'} color={colors.black}/></IconButton>
        <IconButton bgColor={'grey'} ><DownloadSvg/></IconButton>
        <IconButton bgColor={'grey'} onClick={rotateImage}><RotateSvg/></IconButton>
      </div>
    </div>
  )

  return (
    <ModalLayout mobileFullScreen className={styles.modalLayout}>
      <ModalBody className={styles.modalBody}>
        {body}
      </ModalBody>
    </ModalLayout>
  )
}