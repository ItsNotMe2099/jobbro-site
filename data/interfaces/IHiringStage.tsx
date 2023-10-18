import {IProposal} from '@/data/interfaces/IProposal'

export default interface IHiringStage{
  id?: number;
  title: string;
  description: string;
  proposals?: IProposal[];
}
