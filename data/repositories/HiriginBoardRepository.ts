import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IVacancyWithHiringStages} from '@/data/interfaces/IVacancy'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IHiringBoardListRequest} from '@/data/interfaces/IHiringBoardListRequest'

export default class HiringBoardRepository {
  static async fetch(data: IHiringBoardListRequest, config?: AxiosRequestConfig): Promise<IPagination<IVacancyWithHiringStages>> {
    const res = await request<IPagination<IVacancyWithHiringStages>>({
      method: 'get',
      url: '/api/hiring-board',
      data,
      config,
    })
    return res
  }
  static async fetchByVacancyId(vacancyId: number, config?: AxiosRequestConfig): Promise<IPagination<IVacancyWithHiringStages>> {
    const res = await request<IPagination<IVacancyWithHiringStages>>({
      method: 'get',
      url: '/api/hiring-board',
      config,
      data: {
        s: JSON.stringify({id: vacancyId})
      }
    })
    return res
  }

  static async moveToStage(data: {applicationId?: number, proposalId?: number, hiringStageId: number}): Promise<null> {
    const res = await request<null>({
      method: 'post',
      url: '/api/hiring-board/moveToStage',
      data,
    })
    return res
  }

}
