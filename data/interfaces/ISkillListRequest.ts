import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface ISkillListRequest extends IPaginationRequest {
  search?: string
}
