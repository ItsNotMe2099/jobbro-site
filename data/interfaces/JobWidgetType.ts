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
  cardShadow: string
  primaryText: string
  secondaryText: string
  // data
}