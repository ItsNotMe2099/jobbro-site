import {IBenefit} from '@/data/interfaces/IBenefit'
import IFile from '@/data/interfaces/IFile'
import {IServiceCategory} from '@/data/interfaces/IServiceCategory'
import {IGeoName} from '@/data/interfaces/ILocation'

export interface ICompanyPageBlock {
  description: string;
  visible: boolean;
}
export interface ICompany {
  name?: string;
  logo?: IFile;
  url?: string;
  employeesCount?: number;
  industry: IServiceCategory;
  industryId: number;
  country: IGeoName;
  countryId: number;
  about: ICompanyPageBlock;
  mission: ICompanyPageBlock;
  culture: ICompanyPageBlock;
  advantages: ICompanyPageBlock;
  benefits: IBenefit[];
  benefitsIds: number[];
  domain?: string;
  images: IFile[];
  imagesIds: number[];
  createdAt?: Date;

}
