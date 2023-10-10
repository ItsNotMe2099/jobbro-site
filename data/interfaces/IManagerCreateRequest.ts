import {HirerRole} from '@/data/enum/HirerRole'
import {Gender} from '@/data/enum/Gender'

export interface IManagerCreateRequest {
  hirerRole: HirerRole;
  name?: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email: string;
  birthday?: Date;
  gender?: Gender;
}
