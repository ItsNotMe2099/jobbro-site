import {SalaryType} from '@/data/enum/SalaryType'
import {Experience} from '@/data/enum/Experience'
import {Employment} from '@/data/enum/Employment'

export interface IAiVacancy {
  benefits: string[];
  category: string;
  experience: Experience | null;
  experienceDuration: string;
  intro: string;
  keywords: string[];
  name: string;
  requirements: string;
  employment: Employment | null;
  skills: string[];
  subCategory: string;
  tasks: string;
  salaryType: SalaryType | null;
  currency: string;
  salaryMin: string;
  salaryMax: string;
  benefitsDescription: string
}

export default interface IAiVacancyGenRequest{
  id: string;
  status: string
  result?: IAiVacancy
}
