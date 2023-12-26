import {ProfileType} from '@/data/enum/ProfileType'
import {HirerRole} from '@/data/enum/HirerRole'
import {useAppContext} from '@/context/state'
import {ReactElement} from 'react'

enum MenuKey{
  Publish = 'publish',
  Pause = 'pause',
  Edit = 'edit',
  Download = 'download',
  Duplicate = 'duplicate',
  Delete = 'delete'
}
interface Props {
  profileType?: ProfileType
  hirerRole?: HirerRole
  children: ReactElement | ReactElement[]
}

export default function IfCanAccess(props: Props) {
  const appContext = useAppContext()
  console.log('IFCanAccess', ( (props.profileType && props.profileType === appContext.aboutMe?.profileType) || !props.profileType), ((props.hirerRole && props.hirerRole === appContext.aboutMe?.hirerRole) || !props.hirerRole), appContext.aboutMe?.hirerRole)
  if(( (props.profileType && props.profileType === appContext.aboutMe?.profileType) || !props.profileType) && ((props.hirerRole && props.hirerRole === appContext.aboutMe?.hirerRole) || !props.hirerRole)){
    return props.children
  }
  return null
}
