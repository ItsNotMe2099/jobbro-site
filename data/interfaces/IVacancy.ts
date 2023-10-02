import { ISpecializationCategory } from './Common'

export interface ILanguageKnowledge {

}


export interface IVacancy {
  categoriesIds: number[],
  skillsIds :  number[],
  sourcesIds :  number[],
  salary : number,
  languageKnowledges : ILanguageKnowledge[],
  telegramNickname: string,
  countryId: number,
  cityId: number,
  phone : string,
  email : string,
  published? : boolean,
  isSavedByCurrentProfile?: boolean,
  categories?: ISpecializationCategory[],
  commission?: number|null,
}

export interface IModeration {

}
