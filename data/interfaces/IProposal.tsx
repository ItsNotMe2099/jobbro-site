import {ApplicationStatus} from '@/data/enum/ApplicationStatus'

export interface IProposal {
  id: number
  applicationId?: number,
  cvId: number,
  vacancyId: number,
  coverLetter : string
  hiringStageId: number
}

export interface IStat {
  status: ApplicationStatus,
  count: number
}
