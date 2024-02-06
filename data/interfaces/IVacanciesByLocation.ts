import {IVacancy} from '@/data/interfaces/IVacancy'
import {IIpLocate} from '@/data/interfaces/IIpLocate'
import {IPagination} from '@/data/interfaces/IPaginationRequest'

export interface IVacanciesByLocation  extends IPagination<IVacancy>{
 location: IIpLocate | null,
  searchBy: 'city' | 'country' | null
}
