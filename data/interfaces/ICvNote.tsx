import IFile from 'data/interfaces/IFile'
import {IProfile} from '@/data/interfaces/IProfile'

export default interface ICvNote {
  id: number
  message?: string
  profile?: IProfile,
  profileId?: number | string
  assets?: IFile[]
  createdAt: string
}
