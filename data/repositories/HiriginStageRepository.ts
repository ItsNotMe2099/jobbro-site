import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import IHiringStage from '@/data/interfaces/IHiringStage'

export default class HiringStageRepository {
  static async fetchByVacancyId(vacancyId: number, config?: AxiosRequestConfig): Promise<IHiringStage[]> {
    const res = await request<IHiringStage[]>({
      method: 'get',
      url: '/api/owner/vacancy-hiring-stage',
      data: {
        s: JSON.stringify({vacancyId}),
        sort: 'order,ASC',
      },
      config,
    })
    return res
  }

}
