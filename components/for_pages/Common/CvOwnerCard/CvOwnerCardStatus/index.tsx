import styles from './index.module.scss'
import {ICV} from '@/data/interfaces/ICV'
import { Nullable} from '@/types/types'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {ReactElement, useMemo} from 'react'
import {colors} from '@/styles/variables'
import CheckSvg from '@/components/svg/CheckSvg'
import FileSvg from '@/components/svg/FileSvg'
import HideSvg from '@/components/svg/HideSvg'

interface IStatusSettings{
  title: string,
  icon: ReactElement,
  color: string
}
interface Props {
  cv: ICV
}

export default function CvOwnerCardStatus(props: Props) {
  const statusSettings = useMemo<Nullable<IStatusSettings>>(() => {
    switch (props.cv.status){
      case PublishStatus.Paused:
        return {
          title: 'Hidden for Hiring',
          color: colors.textSecondary,
          icon: <HideSvg color={colors.textSecondary} />
        }
      case PublishStatus.Published:
        return {
          title: 'Published',
          color: colors.green,
          icon: <CheckSvg color={colors.green} size={'large'}/>
        }
      case PublishStatus.Draft:
        return {
          title: 'Draft',
          color: colors.textSecondary,
          icon: <FileSvg color={colors.textSecondary}/>
        }
      default:
        return null
    }
  }, [props.cv])

  if(!statusSettings){
    return null
  }
  return (
    <div className={styles.root}>
      {statusSettings.icon}
      <div className={styles.title} style={{color: statusSettings.color}}>{statusSettings.title}</div>
    </div>
  )
}
