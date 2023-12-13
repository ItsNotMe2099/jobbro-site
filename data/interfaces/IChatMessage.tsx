import IFile from 'data/interfaces/IFile'
import {ChatMessageType} from '@/data/enum/ChatMessageType'
import {IProfile} from '@/data/interfaces/IProfile'
import IEvent from '@/data/interfaces/IEvent'
import {IApplication} from '@/data/interfaces/IApplication'
import {IProposal} from '@/data/interfaces/IProposal'
import IChatMessageProfile from '@/data/interfaces/IChatMessageProfile'

export default interface IChatMessage {
  sid?: string | null
  id?: number
  type: ChatMessageType
  message?: string
  chatId?: number
  replyTo?: IChatMessage
  forwarded?: IChatMessage
  application: IApplication;
  applicationId: number;
  proposal: IProposal;
  proposalId: number;
  event: IEvent
  eventId?: number
  pinned?: boolean
  replyToId?: number
  forwardedId: number
  profile?: IProfile,
  profileId?: number | string
  profileStates?: IChatMessageProfile[]
  assets?: IFile[]
  createdAt: string
  saleRequestId?: number
  dealOfferId?: number
}
