import {IBenefit} from '@/data/interfaces/IBenefit'
import IFile from '@/data/interfaces/IFile'
import {IServiceCategory} from '@/data/interfaces/IServiceCategory'
import {IGeoName} from '@/data/interfaces/ILocation'
import {Nullable} from '@/types/types'

export interface ICompanyPageBlock {
  description: Nullable<string>;
  visible: boolean;
}
export interface ICompany {
  id: number
  name?: Nullable<string>;
  logo?: IFile;
  url?: Nullable<string>;
  employeesCount?:  Nullable<number>;
  industry: IServiceCategory;
  industryId: number;
  country: IGeoName;
  countryId:  Nullable<number>;
  about: ICompanyPageBlock;
  mission: ICompanyPageBlock;
  culture: ICompanyPageBlock;
  advantages: ICompanyPageBlock;
  benefits: IBenefit[];
  benefitsIds: number[];
  domain?: Nullable<string>;
  images: IFile[];
  imagesIds: number[];
  createdAt?:  Nullable<Date>;

}
