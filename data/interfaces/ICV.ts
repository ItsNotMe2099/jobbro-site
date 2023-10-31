import {CoursesInfo, EducationInfo, ExperienceInfo} from './Common'
import {IProposal} from './IProposal'
import {IGeoName} from '@/data/interfaces/ILocation'
import IFile from '@/data/interfaces/IFile'
import {ModerationStatus} from '@/data/enum/ModerationStatus'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {SalaryType} from '@/data/enum/SalaryType'
import {IVacancyContactPerson, IVacancyPageBlock} from '@/data/interfaces/IVacancy'
import {VacancyLookType} from '@/data/enum/VacancyLookType'
import {Employment} from '@/data/enum/Employment'
import {IServiceCategory} from '@/data/interfaces/IServiceCategory'
import {Gender} from '@/data/enum/Gender'
import {WorkExperiencePresense} from '@/data/enum/WorkExperiencePresense'
import {Education} from '@/data/enum/Education'
import {Relocation} from '@/data/enum/Relocation'
import {BusinessTrips} from '@/data/enum/BusinessTrips'
import {ISkill} from '@/data/interfaces/ISkill'


export interface ICV {
  id: number
  profileId: number;
  title: string;
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
  salaryMin: number;
  salaryMax: number;
  salaryType: SalaryType;
  about: IVacancyPageBlock;
  skillsDescription: IVacancyPageBlock;
  vacancyLookType: VacancyLookType;
  currency: string;
  contacts: IVacancyContactPerson;
  employment: Employment;
  nativeLanguage: string;
  languageKnowledges: string[];
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
}
