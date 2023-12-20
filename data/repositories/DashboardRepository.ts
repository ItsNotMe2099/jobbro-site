import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {
  IDashboardGraphics,
  IDashboardGraphicsResponseRaw, IDashBoardManager, IDashboardStatistic, IDashboardStatisticResponseRaw
} from '@/data/interfaces/IDashboardResponse'
import { IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {IVacancyHot, IVacancyWithHiringStagesForDashBoard} from '@/data/interfaces/IVacancy'

export default class DashboardRepository {
  static async fetchStatistic(data: {managerId?: number}, config?: AxiosRequestConfig): Promise<IDashboardStatistic> {
    const res = await request<IDashboardStatisticResponseRaw>({
      method: 'get',
      url: '/api/dashboard/statistic',
      data,
      config,
    })
    return {
      completedJobs: res.completedJobs[0].completedJobs,
      checkedCVPerDay: res.checkedCVPerDay[0].checkedCVPerDay,
      savedTimeWithAi: res.savedTimeWithAi[0].savedTimeWithAi,
      recruitmentRate: res.recruitmentRate[0],
      successRate: res.successRate[0],
      averageResponseTime: res.averageResponseTime[0]
    }
  }

  static async fetchGraphics(data: {managerId?: number}, config?: AxiosRequestConfig): Promise<IDashboardGraphics> {
    const res = await request<IDashboardGraphicsResponseRaw>({
      method: 'get',
      url: '/api/dashboard/graphics',
      data,
      config,
    })
    return {
      newCandidates: res.newCandidates[0],
      processedCandidates: res.processedCandidates[0],
      jobsBeingProcessed:res.jobsBeingProcessed[0],
      averageMoveTime: res.averageMoveTime[0]
    }
  }

  static async fetchTeamGraphics(config?: AxiosRequestConfig): Promise<IDashboardGraphics> {
    const res = await request<IDashboardGraphicsResponseRaw>({
      method: 'get',
      url: '/api/dashboard/team/graphics',
      data: {
      },
      config,
    })
    return {
      newCandidates: res.newCandidates[0],
      processedCandidates: res.processedCandidates[0],
      jobsBeingProcessed:res.jobsBeingProcessed[0],
      averageMoveTime: res.averageMoveTime[0]
    }
  }

  static async fetchHiringStageConversion(data: IPaginationRequest, config?: AxiosRequestConfig): Promise<IVacancyWithHiringStagesForDashBoard[]> {
    const res = await request<IVacancyWithHiringStagesForDashBoard[]>({
      method: 'get',
      url: '/api/dashboard/hiringStageConversion',
      data,
      config,
    })
    return res
  }

  static async fetchHotVacancies(config?: AxiosRequestConfig): Promise<IVacancyHot[]> {
    const res = await request<IVacancyHot[]>({
      method: 'get',
      url: '/api/dashboard/hot',
      config,
    })
    return res
  }

  static async fetchManagers(config?: AxiosRequestConfig): Promise<IDashBoardManager[]> {
    const res = await request<IDashBoardManager[]>({
      method: 'get',
      url: '/api/dashboard/team/managers',
      config,
    })
    return res
  }
}
