
import {IProfile} from '@/data/interfaces/IProfile'
import {HirerRole} from '@/data/enum/HirerRole'

export interface IManager extends IProfile{
  hirerRole: HirerRole,
  firstName : string,
  lastName : string,
  position: string,
  password?: string,
  email: string,
  phone: string,
}

