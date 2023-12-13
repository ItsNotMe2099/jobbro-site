import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {Nullable} from '@/types/types'

export interface ILocationCityListRequest extends IPaginationRequest {
  search?: string
  lang?: string
  country?: Nullable<string>
}
