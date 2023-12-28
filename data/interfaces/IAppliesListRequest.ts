import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {ProfileTypeFilter} from '@/data/enum/CvProfileTypeFilter'
import {ISkill} from '@/data/interfaces/ISkill'

export interface IAppliesListRequest extends IPaginationRequest {
  skills?: ISkill[],
  country?: number,
  salaryType?: string,
  currency?: string
  salaryMin?: number
  salaryMax?: number
  profileType?: ProfileTypeFilter[]
  scoreMin?: number,
  scoreMax?: number,
}
