import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IKeywordListRequest extends IPaginationRequest {
  search?: string
}
