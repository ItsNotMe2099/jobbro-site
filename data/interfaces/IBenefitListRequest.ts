import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IBenefitListRequest extends IPaginationRequest {
  search?: string
}
