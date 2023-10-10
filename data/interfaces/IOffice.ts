import {IGeoName} from '@/data/interfaces/ILocation'

export interface IOffice {
  id: number
  name: string
  country: IGeoName
  countryId: number
  city: IGeoName
  cityId: number
  postalCode: string
  street: string
  house: string

}
