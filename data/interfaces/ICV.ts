import { ExperienceInfo, ISource} from './Common'
import { IProposal } from './IProposal'
import {IProfile} from '@/data/interfaces/IProfile'


export interface ICV {
  businessTrips?: boolean|null,
  portfolio: string|null,
  profileId: number,
  moderationStatus: string,  // "approved"add enums
  moderationRejectReason: string|null,
  published: boolean,
  totalViews: string|null,
  totalProposals: number|string|null,
  isTop: boolean,
  topPurchasedAt: string|null,
  hash: string,
  profile: IProfile,
  savedByProfiles: IProfile[],
  proposalByCurrentUser: IProposal|null,
  age: number,
  lastExperienceInfo: ExperienceInfo,
  skills?: ISource[],
  sources?: ISource[]
}
