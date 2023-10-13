import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface ILocationCityListRequest extends IPaginationRequest {
  search?: string
  lang?: string
  country?: number
}
