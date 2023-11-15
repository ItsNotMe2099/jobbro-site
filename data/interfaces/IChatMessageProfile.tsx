import {IProfile} from '@/data/interfaces/IProfile'

export default interface IChatMessageProfile {
  id: number
  profile: IProfile
  profileId: number
  messageId: number
  read: boolean
  readAt: string
  deleted: boolean
  createdAt: string
}
