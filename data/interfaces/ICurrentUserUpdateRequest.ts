import {IPassportData} from '@/data/interfaces/IPassportData'

export interface ICurrentUserUpdateRequest {
  firstName?: string | null,
  lastName?: string | null
  patronymic?: string | null
  passport?: IPassportData | null
}
