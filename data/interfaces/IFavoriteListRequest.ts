import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {SortOrder} from '@/types/enums'
export interface IFavoriteListRequest extends IPaginationRequest {
  sortOrder?: SortOrder
}
