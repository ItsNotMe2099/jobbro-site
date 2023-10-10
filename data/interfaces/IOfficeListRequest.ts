import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IOfficeListRequest extends IPaginationRequest {
  search?: string
}
