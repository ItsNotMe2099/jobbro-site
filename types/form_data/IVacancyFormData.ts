import {Nullable} from '@/types/types'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {Employment} from '@/data/enum/Employment'
import {Workplace} from '@/data/enum/Workplace'
import {IOffice} from '@/data/interfaces/IOffice'
import {SalaryType} from '@/data/enum/SalaryType'
import {Experience, ExperienceDuration} from '@/data/enum/Experience'
import {ApplicationInfoRequirements} from '@/data/enum/ApplicationInfoRequirements'
export interface IVacancyWorkflowData {
  keywords: string[]
  project: Nullable<string>
  applicationFormLanguage: Nullable<string>
  applyAutoMessage: {template: Nullable<string>, enabled: boolean}
  declineAutoMessage: {template: Nullable<string>, enabled: boolean}
  hiringStagesDescriptions: { title: string, description: string }[],
  contactPerson: { name: Nullable<string>, visible: boolean }
  declineAuto: {minRating: Nullable<number>, replyAfter: Nullable<number>, enabled: boolean}
}
export interface IVacancyFormData extends IVacancyWorkflowData{
  status?: Nullable<PublishStatus> | undefined
  name: Nullable<string>
  intro: { description: Nullable<string>, visible: boolean }
  categoryId: Nullable<number>
  subCategoryId: Nullable<number>
  employment: Nullable<Employment>
  workplace: Nullable<Workplace>
  office: Nullable<IOffice>
  currency: Nullable<string>
  salaryMin: Nullable<string|number>
  salaryMax: Nullable<string|number>
  salaryType: Nullable<SalaryType>
  experience: Nullable<Experience>
  experienceDuration?: Nullable<ExperienceDuration>
  benefitsDescription: { description: Nullable<string>, visible: boolean }
  requirements: Nullable<string>
  tasks: Nullable<string>
  cvRequired: Nullable<ApplicationInfoRequirements>
  coverLetterRequired: Nullable<ApplicationInfoRequirements>
  languageKnowledges: {language: string, level: string}[]
  benefits: string[]
  skills: string[]
  keywords: string[]
  project: Nullable<string>
  applicationFormLanguage: Nullable<string>
  applyAutoMessage: {template: Nullable<string>, enabled: boolean}
  declineAutoMessage: {template: Nullable<string>, enabled: boolean}
  hiringStagesDescriptions: { title: string, description: string }[],
  contactPerson: { name: Nullable<string>, visible: boolean }
}

export enum VacancyFormSection{
  Header,
  Intro,
  Details,
  Requirements,
  Experience,
  LanguageTags,
  Skills,
  Tasks,
  Salary,
  Benefits,
  TagsBenefits
}
