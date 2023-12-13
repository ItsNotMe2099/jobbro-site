import {Employment} from '@/data/enum/Employment'
import {IOption} from '@/types/types'
import {Workplace} from '@/data/enum/Workplace'
import {Experience} from '@/data/enum/Experience'
import {SalaryType} from '@/data/enum/SalaryType'
import {ApplicationInfoRequirements} from '@/data/enum/ApplicationInfoRequirements'
import {PublishStatus} from '@/data/enum/PublishStatus'

export default class Dictionary {

  static getEmploymentNames(): {[key in Employment]: string}{
    return {
      [Employment.FullTime]: 'FullTime',
      [Employment.PartTime]: 'PartTime',
      [Employment.Casual]: 'Casual',
      [Employment.Contract]: 'Contract',
      [Employment.Apprenticeship]: 'Apprenticeship',
      [Employment.Traineeship]: 'Traineeship',
    }
  }
  static getEmploymentOptions(): IOption<Employment>[]{
    return Object.keys(Dictionary.getEmploymentNames()).map(i => ({label: Dictionary.getEmploymentName(i as Employment), value: i as Employment}))
  }
  static getEmploymentName(value: Employment) : string {
    return Dictionary.getEmploymentNames()[value]
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
      [Workplace.office]: 'Office',
      [Workplace.hybrid]: 'Hybrid',
      [Workplace.remote]: 'Remote',
    }
  }
  static getWorkplaceOptions(): IOption<Workplace>[]{
    console.log('Dsdsad', Object.keys(Dictionary.getWorkplaceNames()))
    return Object.keys(Dictionary.getWorkplaceNames()).map(i => ({label: Dictionary.getWorkplaceName(i as Workplace), value: i as Workplace}))
  }
  static getWorkplaceName(value: Workplace) : string {
    return Dictionary.getWorkplaceNames()[value]
  }

  static getExperienceNames(): {[key in Experience]: string}{
    return {
      [Experience.Junior]: 'Junior',
      [Experience.Middle]: 'Middle',
      [Experience.Senior]: 'Senior',
      [Experience.None]: 'None',
    }
  }

  static getExperienceOptions(): IOption<Experience>[]{
    return Object.keys(Dictionary.getExperienceNames()).map(i => ({label: Dictionary.getExperienceName(i as Experience), value: i as Experience}))
  }

  static getExperienceName(value: Experience) : string {
    return Dictionary.getExperienceNames()[value]
  }


  static getSalaryTypeNames(): {[key in SalaryType]: string}{
    return {
      [SalaryType.perYear]: 'Per year',
      [SalaryType.perMonth]: 'Per Month',
      [SalaryType.perHour]: 'Per hour',
    }
  }
  static getSalaryTypeOptions(): IOption<SalaryType>[]{
    return Object.keys(Dictionary.getSalaryTypeNames()).map(i => ({label: Dictionary.getSalaryTypeName(i as SalaryType), value: i as SalaryType}))
  }
  static getSalaryTypeName(value: SalaryType) : string {
    return Dictionary.getSalaryTypeNames()[value]
  }



  static getSalaryTypeShortNames(): {[key in SalaryType]: string}{
    return {
      [SalaryType.perYear]: 'y',
      [SalaryType.perMonth]: 'm',
      [SalaryType.perHour]: 'h',
    }
  }
  static getSalaryTypeShortOptions(): IOption<SalaryType>[]{
    return Object.keys(Dictionary.getSalaryTypeNames()).map(i => ({label: Dictionary.getSalaryTypeName(i as SalaryType), value: i as SalaryType}))
  }
  static getSalaryTypeShortName(value: SalaryType) : string {
    return Dictionary.getSalaryTypeShortNames()[value]
  }

  static getApplicationInfoRequirementsNames(): {[key in ApplicationInfoRequirements]: string}{
    return {
      [ApplicationInfoRequirements.Optional]: 'Optional',
      [ApplicationInfoRequirements.Required]: 'Required',
    }
  }

  static getApplicationInfoRequirementsOptions(): IOption<ApplicationInfoRequirements>[]{
    return Object.keys(Dictionary.getApplicationInfoRequirementsNames()).map(i => ({label: Dictionary.getApplicationInfoRequirementsName(i as ApplicationInfoRequirements), value: i as ApplicationInfoRequirements}))
  }

  static getApplicationInfoRequirementsName(value: ApplicationInfoRequirements) : string {
    return Dictionary.getApplicationInfoRequirementsNames()[value]
  }

  static getVacancyStatusNames(): {[key in PublishStatus]: string}{
    return {
      [PublishStatus.Draft]: 'Draft',
      [PublishStatus.Paused]: 'Paused',
      [PublishStatus.Published]: 'Published',
      [PublishStatus.Closed]: 'Closed',
    }
  }

  static getVacancyStatusOptions(): IOption<PublishStatus>[]{
    return Object.keys(Dictionary.getVacancyStatusNames()).map(i => ({label: Dictionary.getVacancyStatusName(i as PublishStatus), value: i as PublishStatus}))
  }

  static getVacancyStatusName(value: PublishStatus) : string {

    return Dictionary.getVacancyStatusNames()[value]
  }
}
