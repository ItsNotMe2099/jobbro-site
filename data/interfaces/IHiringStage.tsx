import {IApplication} from '@/data/interfaces/IApplication'
import {IProposal} from '@/data/interfaces/IProposal'
import {IWithCv} from '@/data/interfaces/Common'

export default interface IHiringStage{
  id: number;
  key: string
  title: string;
  description: string;
}
export interface  IHiringStageWithApply  extends IHiringStage{
  applications: (IApplication & IWithCv)[]
  proposals: (IProposal & IWithCv)[]
  stageConversionRate: number
  currentCandidatesCount: number
}
export interface  IHiringStageForDashBoard  extends IHiringStage{
  stageConversionRate: number
  conversionRate: number
  candidatesCount: number
}
