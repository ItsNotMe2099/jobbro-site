import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import IAiVacancyGenRequest from '@/data/interfaces/IAiVacancy'

export default class AiVacancyGenRequestRepository {
  static async fetchById(id: string, config?: AxiosRequestConfig): Promise<IAiVacancyGenRequest> {
    const res = await request<IAiVacancyGenRequest>({
      method: 'get',
      url: `/api/ai-vacancy-gen-request/${id}`,
      config,
    })
    return res
  }

  static async create(message: string): Promise<IAiVacancyGenRequest> {
    const res = await request<IAiVacancyGenRequest>({
      method: 'post',
      url: '/api/ai-vacancy-gen-request',
      data: {message},
    })
    return res
  }
}
