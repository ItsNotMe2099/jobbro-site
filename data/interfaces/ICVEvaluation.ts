import {Nullable} from '@/types/types'

export interface ICVEvaluation {
  cvId: number,
  vacancyId: number,
  justification: Nullable<string>
  percentEvaluation: number
}
