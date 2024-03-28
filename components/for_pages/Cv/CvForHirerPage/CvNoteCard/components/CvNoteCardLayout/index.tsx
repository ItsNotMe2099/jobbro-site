import styles from './index.module.scss'
import classNames from 'classnames'
import {format} from 'date-fns'
import {ReactElement} from 'react'
import IFile from '@/data/interfaces/IFile'
import AvatarCircular from '@/components/ui/AvatarCircular'
import ICvNote from '@/data/interfaces/ICvNote'

interface Props{
  cvNote: ICvNote
  children?: ReactElement | ReactElement[] | string | undefined
  logo?: IFile|undefined
  styleType: 'green' | 'white'
}

export default function CvNoteCardLayout(props: Props) {

  return (<div className={classNames(styles.root, {
   [styles[props.styleType]]: true,
  })}>
    <div className={styles.message}>
      {props.logo &&
       <AvatarCircular file={props.logo} initials={'0'}/>
      }
      {props.children}
      <div className={styles.time}>{format(new Date(props.cvNote.createdAt), 'HH:mm')}</div>
    </div>
  </div>)
}


