import { Employment } from '../enum/Employment'
import { IGeoName } from './ILocation'
import { IServiceCategory } from './IServiceCategory'

export interface IJobWidget {
  // settings
  categoryFilter: boolean
  locationFilter: boolean
  employmentFilter: boolean
  language: { label: string }
  jobsPerPage: number|undefined
  showItemLogo: boolean
  showItemLocation: boolean
  showItemEmploymentType: boolean
  showItemCategory: boolean
  //design
  backgroundWidget: string
  filterBorders: string
  pagination: string
  backgroundJobCard: string
  cardBorder: string
  showCardBorder: boolean
  cardShadow: string
  showCardShadow: boolean
  primaryText: string
  secondaryText: string
  // data
  category: IServiceCategory[]
  location: IGeoName[]
  employment: Employment[]
}