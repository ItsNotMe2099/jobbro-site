import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface ILocationCountryListRequest extends IPaginationRequest {
  search?: string
  lang?: string
}
