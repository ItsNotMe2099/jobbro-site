import {ChatMessageType} from '@/data/enum/ChatMessageType'
import {Nullable} from '@/types/types'
import IFile from '@/data/interfaces/IFile'

export interface ICvNoteCreateRequest{
  cvId?: number
  message?: Nullable<string>
  type?: ChatMessageType
  assetsIds?: number[]
  assets?: IFile[]
}
