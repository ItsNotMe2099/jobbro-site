import IChatMessage from '@/data/interfaces/IChatMessage'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {IProfile} from '@/data/interfaces/IProfile'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {ICV} from '@/data/interfaces/ICV'

export default interface IChat {
  id: number
  name: string
  published: boolean
  profile: IProfile
  profileId: number | string
  vacancy: IVacancy
  vacancyId: number
  cv: ICV
  cvId: number
  last: IChatMessage
  isGroup: boolean;
  lastMessage: string
  lastMessageType: string
  searchMessage?: string
  searchMessageType?: string
  searchMessageAt?: string
  profiles: IProfile[]
  lastMessageAt: string
  firstReplyAt: string
  createdAt: string
  totalUnread: number
  messages?: IPagination<IChatMessage>
}
