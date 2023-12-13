import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IProjectListRequest extends IPaginationRequest {
  search?: string
}
