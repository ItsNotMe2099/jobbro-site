import { Employment } from '../enum/Employment'
import { ISpecializationCategory } from './Common'
import { IGeoName } from './ILocation'

export interface IJobWidget {
  // settings
  categoryFilter: boolean
  locationFilter: boolean
  employmentFilter: boolean
  language: string
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
  categories: ISpecializationCategory[]
  categoriesIds: number[]
  location: IGeoName[]
  locationIds: number[]
  employments: Employment[]
  token: string
  company: any
}