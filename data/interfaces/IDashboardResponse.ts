import {HirerRole} from '@/data/enum/HirerRole'
import IFile from '@/data/interfaces/IFile'

export interface IDashboardStatisticResponseRaw{
  completedJobs: {completedJobs: number}[]
  checkedCVPerDay: {checkedCVPerDay: number}[]
  savedTimeWithAi: {savedTimeWithAi: number}[]
  recruitmentRate: {
    recruitment_rate_in_month: number,
    recruitment_rate_in_week: number,
    recruitment_rate_in_prev_week: number,
    vacancies_published_in_month: number,
    vacancies_published_in_week: number,
    vacancies_published_in_prev_week: number,
    offers_in_month: number,
    offers_in_week: number,
    offers_in_prev_week: number
  }[],
  successRate: {
    success_rate_in_month: number,
    success_rate_in_week: number,
    success_rate_in_prev_week: number,
    interview_completed_in_month: number,
    interview_completed_in_week: number,
    interview_completed_in_prev_week: number,
    offers_in_month: number,
    offers_in_week: number,
    offers_in_prev_week: number
  }[]
  averageResponseTime: {
    average_response_time_in_week: number,
    average_response_time_in_prev_week: number
  }[]
}

export interface IDashboardStatistic{
 completedJobs: number
  checkedCVPerDay: number
  savedTimeWithAi: number,
  recruitmentRate: {
    recruitment_rate_in_month: number,
    recruitment_rate_in_week: number,
    recruitment_rate_in_prev_week: number,
    vacancies_published_in_month: number,
    vacancies_published_in_week: number,
    vacancies_published_in_prev_week: number,
    offers_in_month: number,
    offers_in_week: number,
    offers_in_prev_week: number
  }
  successRate: {
    success_rate_in_month: number,
    success_rate_in_week: number,
    success_rate_in_prev_week: number,
    interview_completed_in_month: number,
    interview_completed_in_week: number,
    interview_completed_in_prev_week: number,
    offers_in_month: number,
    offers_in_week: number,
    offers_in_prev_week: number
  }
  averageResponseTime: {
    average_response_time_in_week: number,
    average_response_time_in_prev_week: number
  }
}

export interface IDashboardGraphicsResponseRaw{
  newCandidates: {
    applications_in_week: number,
    applications_in_prev_week: number,
    proposals_in_week: number,
    proposals_in_prev_week: number
  }[]
  processedCandidates: {
    applications_processed_in_week: number,
    applications_processed_in_prev_week: number,
    proposals_processed_in_week: number,
    proposals_processed_in_prev_week: number
  }[]
  jobsBeingProcessed: {
    total_vacancies_published_in_week: number,
    total_vacancies_published_in_prev_week: number,
    manager_vacancies_published_in_week: number,
    manager_vacancies_published_in_prev_week: number
  }[]
  averageMoveTime: {
    average_move_time_in_week: number,
    average_move_time_in_prev_week: number
  }[]
}



export interface IDashboardGraphics{
  newCandidates: {
    applications_in_week: number,
    applications_in_prev_week: number,
    proposals_in_week: number,
    proposals_in_prev_week: number
  }
  processedCandidates: {
    applications_processed_in_week: number,
    applications_processed_in_prev_week: number,
    proposals_processed_in_week: number,
    proposals_processed_in_prev_week: number
  }
  jobsBeingProcessed: {
    total_vacancies_published_in_week: number,
    total_vacancies_published_in_prev_week: number,
    manager_vacancies_published_in_week: number,
    manager_vacancies_published_in_prev_week: number
  }
  averageMoveTime: {
    average_move_time_in_week: number,
    average_move_time_in_prev_week: number
  }
}

export interface IDashBoardManager{
  id: number,
  firstName: string,
  lastName: string,
  hirerRole: HirerRole,
  image: IFile,
  average_response_time_in_week: number,
  average_response_time_in_prev_week: number,
  manager_vacancies_published_in_week: number,
  manager_vacancies_published_in_prev_week: number,
  average_move_time_in_week: number,
  average_move_time_in_prev_week: number
}
