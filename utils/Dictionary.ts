import {Employment} from '@/data/enum/Employment'
import {IOption} from '@/types/types'
import {Workplace} from '@/data/enum/Workplace'
import {Experience, ExperienceDuration} from '@/data/enum/Experience'
import {SalaryType} from '@/data/enum/SalaryType'
import {ApplicationInfoRequirements} from '@/data/enum/ApplicationInfoRequirements'
import {PublishStatus} from '@/data/enum/PublishStatus'
import {Translate} from 'next-translate'

export default class Dictionary {

  static getEmploymentNames(): {[key in Employment]: string}{
    return {
      [Employment.FullTime]: 'dictionary_employment_type_full_time',
      [Employment.PartTime]: 'dictionary_employment_type_part_time',
      [Employment.Casual]: 'dictionary_employment_type_casual',
      [Employment.Contract]: 'dictionary_employment_type_contract',
      [Employment.Apprenticeship]: 'dictionary_employment_type_apprenticeship',
      [Employment.Traineeship]: 'dictionary_employment_type_traineeship',
    }
  }
  static getEmploymentOptions(t: Translate): IOption<Employment>[]{
    return Object.keys(Dictionary.getEmploymentNames()).map(i => ({label: Dictionary.getEmploymentName(i as Employment, t), value: i as Employment}))
  }
  static getEmploymentName(value: Employment, t: Translate) : string {
    return t(Dictionary.getEmploymentNames()[value])
  }

  static getEmployeeCountNames(): {[key: number]: string}{
    return {
      1: '1-10',
      2: '10-50',
      3: '50-100',
      4: '100-1000',
      5: '1000+',
    }
  }
  static getEmployeeCountOptions(): IOption<number>[]{
    return [1, 2,3,4,5].map(i => ({label: Dictionary.getEmployeeCountName(i as number), value: i as number}))
  }
  static getEmployeeCountName(value: number) : string {
    return Dictionary.getEmployeeCountNames()[value]
  }

  static getWorkplaceNames(): {[key in Workplace]: string}{
    return {
      [Workplace.office]: 'dictionary_workplace_office',
      [Workplace.hybrid]: 'dictionary_workplace_hybrid',
      [Workplace.remote]: 'dictionary_workplace_remote',
    }
  }
  static getWorkplaceOptions(t: Translate): IOption<Workplace>[]{
    return Object.keys(Dictionary.getWorkplaceNames()).map(i => ({label: Dictionary.getWorkplaceName(i as Workplace, t), value: i as Workplace}))
  }
  static getWorkplaceName(value: Workplace, t: Translate) : string {
    return t(Dictionary.getWorkplaceNames()[value])
  }

  //============= Experience 
  static getExperienceNames(): {[key in Experience]: string}{
    return {
      [Experience.Junior]: 'dictionary_experience_junior',
      [Experience.Middle]: 'dictionary_experience_middle',
      [Experience.Senior]: 'dictionary_experience_senior',
      [Experience.None]: 'dictionary_experience_none',
    }
  }

  static getExperienceOptions(t: Translate): IOption<Experience>[]{
    return Object.keys(Dictionary.getExperienceNames()).map(i => ({label: Dictionary.getExperienceName(i as Experience, t), value: i as Experience}))
  }

  static getExperienceName(value: Experience, t: Translate) : string {
    return t(Dictionary.getExperienceNames()[value])
  }

  //============= Experience Duration
   static getExperienceDurationName(value: ExperienceDuration, t: Translate) : string {
    return t(Dictionary.getExperienceDurationNames()[value])
  }

  static getExperienceDurationNames(): {[key in ExperienceDuration]: string}{
    return {
      [ExperienceDuration.NoExp]: 'dictionary_experience_duration_none',
      [ExperienceDuration.From1to3]: 'dictionary_experience_duration_1to3',
      [ExperienceDuration.From3to6]: 'dictionary_experience_duration_3to6',
      [ExperienceDuration.From6]: 'dictionary_experience_duration_to6',
    }
  }

  static getExperienceDurationOptions(t: Translate): IOption<ExperienceDuration>[]{
    return Object.keys(Dictionary.getExperienceDurationNames()).map(i => ({label: Dictionary.getExperienceDurationName(i as ExperienceDuration, t), value: i as ExperienceDuration}))
  }


  static getSalaryTypeNames(): {[key in SalaryType]: string}{
    return {
      [SalaryType.perYear]: 'dictionary_salary_type_per_year',
      [SalaryType.perMonth]: 'dictionary_salary_type_per_month',
      [SalaryType.perHour]: 'dictionary_salary_type_per_hour',
    }
  }
  static getSalaryTypeOptions(t: Translate): IOption<SalaryType>[]{
    return Object.keys(Dictionary.getSalaryTypeNames()).map(i => ({label: Dictionary.getSalaryTypeName(i as SalaryType, t), value: i as SalaryType}))
  }
  static getSalaryTypeName(value: SalaryType, t: Translate) : string {
    return t(Dictionary.getSalaryTypeNames()[value])
  }



  static getSalaryTypeShortNames(): {[key in SalaryType]: string}{
    return {
      [SalaryType.perYear]: 'y',
      [SalaryType.perMonth]: 'm',
      [SalaryType.perHour]: 'h',
    }
  }
  static getSalaryTypeShortOptions(t: Translate): IOption<SalaryType>[]{
    return Object.keys(Dictionary.getSalaryTypeNames()).map(i => ({label: Dictionary.getSalaryTypeName(i as SalaryType, t), value: i as SalaryType}))
  }
  static getSalaryTypeShortName(value: SalaryType) : string {
    return Dictionary.getSalaryTypeShortNames()[value]
  }

  static getApplicationInfoRequirementsNames(): {[key in ApplicationInfoRequirements]: string}{
    return {
      [ApplicationInfoRequirements.Optional]: 'dictionary_requirements_optional',
      [ApplicationInfoRequirements.Required]: 'dictionary_requirements_required',
    }
  }

  static getApplicationInfoRequirementsOptions(t: Translate): IOption<ApplicationInfoRequirements>[]{
    return Object.keys(Dictionary.getApplicationInfoRequirementsNames()).map(i => ({label: Dictionary.getApplicationInfoRequirementsName(i as ApplicationInfoRequirements, t), value: i as ApplicationInfoRequirements}))
  }

  static getApplicationInfoRequirementsName(value: ApplicationInfoRequirements, t: Translate) : string {
    return t(Dictionary.getApplicationInfoRequirementsNames()[value])
  }

  static getVacancyStatusNames(): {[key in PublishStatus]: string}{
    return {
      [PublishStatus.Draft]: 'dictionary_vacancy_status_draft',
      [PublishStatus.Paused]: 'dictionary_vacancy_status_paused',
      [PublishStatus.Published]: 'dictionary_vacancy_status_published',
      [PublishStatus.Closed]: 'dictionary_vacancy_status_closed',
    }
  }

  static getVacancyStatusOptions(t: Translate): IOption<PublishStatus>[]{
    return Object.keys(Dictionary.getVacancyStatusNames()).map(i => ({label: Dictionary.getVacancyStatusName(i as PublishStatus, t), value: i as PublishStatus}))
  }

  static getVacancyStatusName(value: PublishStatus, t: Translate) : string {
    return t(Dictionary.getVacancyStatusNames()[value])
  }
}
