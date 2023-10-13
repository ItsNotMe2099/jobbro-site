import { TimeStamp } from './Common'
import { IGeoName } from './ILocation'
import {ProfileType} from '@/data/enum/ProfileType'
import {HirerRole} from '@/data/enum/HirerRole'
import IFile from '@/data/interfaces/IFile'

export interface IProfile extends TimeStamp {
  id: string,
  userId: number,
  profileType: ProfileType,
  hirerRole: HirerRole,
  firstName: string,
  lastName: string,
  patronymic: string|null,
  birthday: string|null,
  telegramNickname: string|null,
  phone: string,
  email: string,
  position: string | null,
  company?: string|null,
  countryId: number,
  cityId: number,
  lastActivityAt: string,//Date
  imageId: string|number|null,
  statsIntervalInDays: number,
  statsShowViews: boolean,
  statsShowResponses: boolean,
  statsShowNewVacanciesCount: boolean,
  statsShowNewCVsCount: boolean,
  ownerId: null,
  image: IFile | null,
  country: IGeoName,
  city: IGeoName,
}


