import { IChat, TimeStamp } from './Common'
import { ICV } from './ICV'
import { IVacancy } from './IVacancy'
import {ApplicationStatus} from '@/data/enum/ApplicationStatus'
import {IProfile} from '@/data/interfaces/IProfile'

export interface IApplication extends TimeStamp{
  id: number,
  vacancyId?: number,
  cvId: number,
  profileId: number,
  status: ApplicationStatus,
  coverLetter: string,
  vacancy: IVacancy,
  profile: IProfile,
  cv: ICV,
  proposals: [],
  chat: IChat[],
}


