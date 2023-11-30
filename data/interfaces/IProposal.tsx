import {ApplyStatus} from '@/data/enum/ApplyStatus'

export interface IProposal {
  id: number
  applicationId?: number,
  cvId: number,
  vacancyId: number,
  coverLetter : string
  hiringStageId: number
  status: ApplyStatus
}

