import {  TimeStamp } from './Common'
import { ICV } from './ICV'
import { IVacancy } from './IVacancy'
import {IProfile} from '@/data/interfaces/IProfile'
import IChat from '@/data/interfaces/IChat'
import {ApplyStatus} from '@/data/enum/ApplyStatus'

export interface IApplication extends TimeStamp{
  id: number,
  vacancyId?: number,
  cvId: number,
  profileId: number,
  status: ApplyStatus
  coverLetter: string,
  vacancy: IVacancy,
  profile: IProfile,
  cv: ICV,
  hiringStageId: number
  proposals: [],
  chat: IChat[],
}




