import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IManagerListRequest extends IPaginationRequest {
  search?: string
}
