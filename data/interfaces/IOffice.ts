import {IGeoName} from '@/data/interfaces/ILocation'
import {Nullable} from '@/types/types'

export interface IOffice {
  id?: number
  name: Nullable<string>
  country: IGeoName
  countryId: Nullable<number>
  city: IGeoName
  cityId: Nullable<number>
  postalCode: Nullable<string>
  street: Nullable<string>
  house: Nullable<string>
  companyId: Nullable<string>
  jobsCount: string
  managersCount: string
  isDefault: boolean
}
