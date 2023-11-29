import {Nullable} from '@/types/types'

export default interface IFeedbackCreateRequest {
  vacancyId: number,
  markCandidateSelection?: number,
  reviewCandidateSelection?: Nullable<string>
  markPlatform?: number
  reviewPlatform?: Nullable<string>
}
