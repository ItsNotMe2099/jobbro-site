import styles from './index.module.scss'
import classNames from 'classnames'
import ImageHelper from 'utils/ImageHelper'
import {Preset} from 'types/enums'
import IFile from 'data/interfaces/IFile'
import {ReactElement} from 'react'
import DocumentPreview from 'components/ui/DocumentPreview'
import usePressAndHover from '@/components/hooks/usePressAndHover'


interface Props {
  isImage?: boolean
  hover?: boolean
  value?: IFile | File | null
  previewPath?: string
  previewName?: string
  vertical?: boolean
  progress: number
  icon?: ReactElement
  stubIcon?: ReactElement
}

export default function FileUploadIconPreview(props: Props) {
  const [avatarRef, press, hover] = usePressAndHover()
  const getIcon = (): ReactElement | null => {
    if(props.icon){
      return props.icon
    }
    if(props.isImage){
      return <></>//<AddImageSvg color={colors.dark500}/>
    }else if(!props.value){
      return <></>//<AttachSvg color={colors.dark500}/>
    }else{
      return null
    }

  }
  const getIconStub = (): ReactElement => {
    if(props.stubIcon || props.icon){
      return props.stubIcon ?? props.icon!
    }
    if(props.isImage){
      return <></>//<AddImageSvg  color={colors.grey500}/>
    }else{
      return <></>
    }

  }
  console.log('props111', props)
  return (
      <div
        ref={avatarRef}
        className={classNames({
          [styles.avatar]: true,
          [styles.vertical]: props.vertical,
        })}
      >
        <div className={styles.wrapper}>
          {(props.isImage && props.previewPath && !(props.value as IFile)?.source) && <img className={styles.preview} src={props.previewPath} alt=""/>}
          {(!props.isImage && props.previewPath && !(props.value as IFile)?.source) && <DocumentPreview file={props.previewName!} name={props.previewName!}/>}
          {props.isImage && (props.value as IFile)?.source && (
            <img
              className={classNames({
                [styles.resultImage]: true,
                [styles.hover]: hover && props.hover,
              })}
              src={ImageHelper.urlFromFile(props.value as IFile, Preset.xsCrop)}
              alt=""
            />
          )}
          {!props.isImage && (props.value as IFile)?.source && (
            <DocumentPreview file={(props.value as IFile).source ?? (props.value as File).name} name={(props.value as IFile).name ??(props.value as File).name}/>
          )}


          {/*<div className={styles.resultCameraIcon}>{props.icon ?? getIcon()}</div>*/}

          {(!props.previewPath && !props.value) && getIconStub()}
        </div>
      </div>
  )
}

