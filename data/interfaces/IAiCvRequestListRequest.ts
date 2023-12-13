import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IAiCvRequestListRequest extends IPaginationRequest{
  statuses?: string[],
  ids?: string[]
}
