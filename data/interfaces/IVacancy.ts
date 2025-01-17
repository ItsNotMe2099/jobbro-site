import {IServiceCategory} from '@/data/interfaces/IServiceCategory'
import {ISkill} from '@/data/interfaces/ISkill'
import {SalaryType} from '@/data/enum/SalaryType'
import {IBenefit} from '@/data/interfaces/IBenefit'
import {IKeyword} from '@/data/interfaces/IKeyword'
import {Experience, ExperienceDuration} from '@/data/enum/Experience'
import {Workplace} from '@/data/enum/Workplace'
import {Employment} from '@/data/enum/Employment'
import {IOffice} from '@/data/interfaces/IOffice'
import IFile from '@/data/interfaces/IFile'
import IHiringStage, {IHiringStageForDashBoard} from '@/data/interfaces/IHiringStage'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {ApplicationInfoRequirements} from '@/data/enum/ApplicationInfoRequirements'
import {ICompany} from '@/data/interfaces/ICompany'
import {IProposal} from '@/data/interfaces/IProposal'
import {IApplication} from '@/data/interfaces/IApplication'
import {IHiringStageWithApply} from '@/data/interfaces/IHiringStage'
import {VacancyCreationType} from '@/data/enum/VacancyCreationType'
import {IProject} from '@/data/interfaces/IProject'
import { TimeStamp } from './Common'
import { IProfile } from './IProfile'
import {Nullable} from '@/types/types'

export interface IHiringStageDescription {
  title: string;
  description: string;
}

export interface IAutoMessage{
  template: string
  enabled: boolean
}
export interface IVacancyPageBlock {
  description: string;
  visible: boolean;
}

export interface IVacancyContactPerson {
  name: string | null;
  // email?: string;
  // phone?: string;
  // telegramNickname?: string;
  visible: boolean;
}

export interface IVacancy extends TimeStamp {
  applicationByCurrentUser: IApplication;
  id: number;
  profileId: number;
  profile: IProfile;
  name: string;
  company: ICompany
  intro: IVacancyPageBlock;
  category: IServiceCategory;
  categoryId: number;
  subCategory: IServiceCategory;
  subCategoryId: number;
  requirements: string;
  skills: ISkill[];
  skillsTitles: string[];
  tasks: string;
  salaryMin: string | number;
  salaryMax: string | number;
  salaryType: SalaryType;
  currency: string;
  benefits: IBenefit[];
  benefitsTitles: string[];
  keywords: IKeyword[];
  keywordsTitles: string[];
  projectTitle: string;
  benefitsDescription: IVacancyPageBlock;
  experience: Experience;
  experienceDuration: ExperienceDuration,
  workplace: Workplace;
  employment: Employment;
  languageKnowledges: {language: string, level: string}[] ;
  office: IOffice;
  officeId: number;
  companyId: number;
  countryCode: string
  image?: IFile;
  imageId: number;
  schedulePublishAt: Date;
  contactPerson: IVacancyContactPerson;
  hiringStagesDescriptions: IHiringStageDescription[];
  hiringStages: IHiringStage[];
  hiringStagesIds: number[];
  status: PublishStatus;
  cvRequired: ApplicationInfoRequirements;
  coverLetterRequired: ApplicationInfoRequirements;
  isSavedByCurrentProfile: boolean;
  totalViews: number;
  totalApplications: string;
  totalProposals: string;
  hashVacancy: string
  applicationFormLanguage: string
  applyAutoMessage: IAutoMessage
  declineAutoMessage: IAutoMessage
  declineAuto: {minRating: Nullable<number>, replyAfter: Nullable<number>, enabled: boolean}
  creationType: VacancyCreationType
  project: IProject | null
}
export interface IVacancyWithApply extends IVacancy{
  proposals: IProposal[]
  applications: IApplication[]
}

export interface IVacancyWithCurrentUserApply extends IVacancy{
  applicationByCurrentUser: IApplication
  proposalToCurrentUser: IProposal
}

export interface IVacancyWithHiringStages extends IVacancy{
  hiringStages: IHiringStageWithApply[]
  conversionRate: number
}
export interface IVacancyWithHiringStagesForDashBoard extends IVacancy{
  hiringStages: IHiringStageForDashBoard[]
  conversionRate: number
}
export interface IVacancyHot extends IVacancy{
  applications_count: number
}
