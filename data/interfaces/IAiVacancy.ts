export interface IAiVacancy {
  benefits: string[];
  category: string;
  experience: string;
  experienceDuration: string;
  intro: string;
  keywords: string[];
  name: string;
  requirements: string;
  skills: string[];
  subCategory: string;
  tasks: string;
}

export default interface IAiVacancyGenRequest{
  id: string;
  status: string
  result?: IAiVacancy
}
