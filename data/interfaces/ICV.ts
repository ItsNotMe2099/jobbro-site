import {CoursesInfo, EducationInfo, ExperienceInfo} from './Common'
import {IProposal} from './IProposal'
import {IGeoName} from '@/data/interfaces/ILocation'
import IFile from '@/data/interfaces/IFile'
import {ModerationStatus} from '@/data/enum/ModerationStatus'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {SalaryType} from '@/data/enum/SalaryType'
import { IVacancyPageBlock} from '@/data/interfaces/IVacancy'
import {VacancyLookType} from '@/data/enum/VacancyLookType'
import {Employment} from '@/data/enum/Employment'
import {IServiceCategory} from '@/data/interfaces/IServiceCategory'
import {Gender} from '@/data/enum/Gender'
import {WorkExperiencePresense} from '@/data/enum/WorkExperiencePresense'
import {Education} from '@/data/enum/Education'
import {Relocation} from '@/data/enum/Relocation'
import {BusinessTrips} from '@/data/enum/BusinessTrips'
import {ISkill} from '@/data/interfaces/ISkill'
import {Nullable} from '@/types/types'
import {IProfile} from '@/data/interfaces/IProfile'
import {IApplication} from '@/data/interfaces/IApplication'
export interface ILanguageKnowledge{
  language: string
  level: string
}
export enum CvContactPersonType {
  Email = 'email',
  Phone = 'phone'
}
export interface ICvContactPerson {
  email?: string;
  phone?: string;
}


export interface ICV {
  id: number
  profileId: number;
  profile: Nullable<IProfile>
  title: string;
  name?: Nullable<string>
  firstName?: Nullable<string>
  lastName?: Nullable<string>
  patronymic?: Nullable<string>
  category: IServiceCategory;
  categoryId: number;
  subCategory: IServiceCategory;
  subCategoryId: number;
  birthday: Date;
  age: number
  gender: Gender;
  workExperiencePresense: WorkExperiencePresense;
  education: Education;
  relocation: Relocation;
  businessTrips: BusinessTrips;
  position: string;
  bio: string;
  portfolio: string;
  skills: ISkill[];
  skillsIds: number[];
  salaryMin: string | number;
  salaryMax: string | number;
  salaryType: SalaryType;
  about: IVacancyPageBlock;
  skillsDescription: IVacancyPageBlock;
  vacancyLookType: VacancyLookType;
  currency: string;
  contactsVisible: boolean;
  contacts: ICvContactPerson[];
  employment: Employment;
  nativeLanguage: string;
  languageKnowledges: ILanguageKnowledge[];
  experienceInfo: ExperienceInfo[];
  educationInfo: EducationInfo[];
  coursesInfo: CoursesInfo[];
  lastExperienceInfo: ExperienceInfo;
  country: IGeoName;
  countryId: number;
  city: IGeoName;
  cityId: number;
  countryCode: string
  image?: IFile;
  imageId: number;
  moderationStatus: ModerationStatus;
  status: PublishStatus;
  proposals: IProposal[];
  proposalByCurrentUser: IProposal;
  isSavedByCurrentProfile: boolean;
  totalViews: number;
  totalProposals: number;
  isTop: boolean;
  topPurchasedAt: string;
  hashCV: string;
  hash: string;
  createdAt: string;
  updatedAt: string;
  file: IFile
  isChecked: boolean
}
export interface ICVWithApply extends ICV {
  proposals: IProposal[]
  applications: IApplication[]
}
