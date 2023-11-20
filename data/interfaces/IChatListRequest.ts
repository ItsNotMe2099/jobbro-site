import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {Nullable} from '@/types/types'
import {ApplicationStatus} from '@/data/enum/ApplicationStatus'

export interface IChatListRequest extends IPaginationRequest{
  search?: Nullable<string>,
  vacanciesIds?: string
  onlyUnread?: boolean
  applicationStatus?: ApplicationStatus
  inactive?: boolean
  filter?: 'invites' | 'unread'
}
