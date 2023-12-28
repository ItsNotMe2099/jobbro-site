import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {IProject} from '@/data/interfaces/IProject'

export interface IVacancyOwnerListRequest extends IPaginationRequest {
  sort?: string
  statuses?: PublishStatus[]
  publishedAt?: string
  projects?: IProject[]
  search?: string
}
