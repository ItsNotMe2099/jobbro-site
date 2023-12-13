import {ChatMessageType} from '@/data/enum/ChatMessageType'
import {Nullable} from '@/types/types'
import IFile from '@/data/interfaces/IFile'

export interface IChatMessageCreateRequest{
  sid?: string
  chatId?: number
  message?: Nullable<string>
  type?: ChatMessageType
  assetsIds?: number[]
  assets?: IFile[]
  userId?: string
}
