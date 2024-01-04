import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {IProject} from '@/data/interfaces/IProject'

export interface IHiringBoardListRequest extends IPaginationRequest {
  sort?: string
  statuses?: PublishStatus[]
  publishedAt?: string
  projects?: IProject[]
  search?: string
}
