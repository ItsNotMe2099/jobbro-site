import { IVacancyFormData } from '@/components/for_pages/Lk/Jobs/Form'
import { IPaginationRequest } from './IPaginationRequest'
import { IGeoName } from './ILocation'

export interface IVacancyFilterParamsInner extends 
Pick<IVacancyFormData, 
'experience'|
'skills'|
'salaryMin'|
'salaryMax'|
'keywords'|
'languageKnowledges'>, 
IPaginationRequest 
{
  categories: (number|string)[]
  subcategories: (number|string)[]
  cities: (string|number)[]
  countries: (string|number)[]
  savedByCurrentProfile: boolean
  search: string
  salaryType: IVacancyFormData['salaryType'][]
  currency: IVacancyFormData['currency'][]
  employment: IVacancyFormData['employment'][]
  workplace: IVacancyFormData['workplace'][]
  currentDay: boolean
  nearMeByIp: boolean
  ip: string
  fullCountries: IGeoName[],
  country: IGeoName,
  fullCities: IGeoName[]
  city: IGeoName
}

export interface IVacancyFilterParams extends Partial<IVacancyFilterParamsInner> {
}