import {ApplicationStatus} from '@/data/enum/ApplicationStatus'

export interface IProposal {
  applicationId?: number,
  cvId: number,
  vacancyId: number,
  coverLetter : string
}

export interface IStat {
  status: ApplicationStatus,
  count: number
}
