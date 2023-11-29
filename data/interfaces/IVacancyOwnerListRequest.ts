import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {PublishStatus} from '@/data/enum/PublishStatus'

export interface IVacancyOwnerListRequest extends IPaginationRequest {
  sort?: string
  statuses?: PublishStatus[]
  publishedAt?: string
  projects?: number[]
  search?: string
}
