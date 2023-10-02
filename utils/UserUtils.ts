import {Nullable} from '@/types/types'
import {IProfile} from '@/data/interfaces/IProfile'
import {HirerRole} from '@/data/enum/HirerRole'

export default class UserUtils {
  static getName(user: IProfile | null | {
    firstName?: Nullable<string>
    lastName?: Nullable<string>
    patronymic?: Nullable<string>}): string {
    if (!user) {
      return ''
    }
    return  `${ (user?.firstName || user?.lastName) ? ` ${user?.lastName || ''}${user?.firstName ? ` ${user?.firstName }` : ''}${user?.patronymic ? ` ${user?.patronymic }` : ''}` : ''}`

  }

  static getHirerRoleNames(): {[key in HirerRole]: string}{
    return {
      [HirerRole.Admin]: 'Администратор',
      [HirerRole.Manager]: 'Менеджеры',
    }
  }
  static getHirerRoleName(role: HirerRole) : string {
    return UserUtils.getHirerRoleNames()[role]
  }
}
