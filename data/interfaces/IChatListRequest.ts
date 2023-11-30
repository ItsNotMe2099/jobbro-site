import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {Nullable} from '@/types/types'
import {ApplyStatus} from '@/data/enum/ApplyStatus'

export interface IChatListRequest extends IPaginationRequest{
  search?: Nullable<string>,
  vacanciesIds?: string
  onlyUnread?: boolean
  applicationStatus?: ApplyStatus
  inactive?: boolean
  filter?: 'invites' | 'unread'
}
