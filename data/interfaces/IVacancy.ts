import {IServiceCategory} from '@/data/interfaces/IServiceCategory'
import {ISkill} from '@/data/interfaces/ISkill'
import {SalaryType} from '@/data/enum/SalaryType'
import {IBenefit} from '@/data/interfaces/IBenefit'
import {IKeyword} from '@/data/interfaces/IKeyword'
import {Experience} from '@/data/enum/Experience'
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

export interface IVacancy {
  id: number;
  profileId: number;
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
  salaryMin: number;
  salaryMax: number;
  salaryType: SalaryType;
  currency: string;
  benefits: IBenefit[];
  benefitsTitles: string[];
  keywords: IKeyword[];
  keywordsTitles: string[];
  benefitsDescription: IVacancyPageBlock;
  experience: Experience;
  workplace: Workplace;
  employment: Employment;
  languageKnowledges: string[];
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
  totalApplications: number;
  hashVacancy: string
  applicationFormLanguage: string
  applyAutoMessage: IAutoMessage
  declineAutoMessage: IAutoMessage
  createdAt: Date;
}
export interface IVacancyWithApply extends IVacancy{
  proposals: IProposal[]
  applications: IApplication[]
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
