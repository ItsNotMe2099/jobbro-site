import {IProfile} from '@/data/interfaces/IProfile'
import {ICV} from '@/data/interfaces/ICV'

export interface ICandidate{
  id: number
  cv: ICV,
  cvId: number
  owner: IProfile
  ownerId: number
}
