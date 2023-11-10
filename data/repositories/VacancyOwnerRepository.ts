import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {DeepPartial} from '@/types/types'
import {IVacancyOwnerListRequest} from '@/data/interfaces/IVacancyOwnerListRequest'
import {IVacancy} from '@/data/interfaces/IVacancy'

export default class VacancyOwnerRepository {
  static async fetch(data: IVacancyOwnerListRequest, config?: AxiosRequestConfig): Promise<IPagination<IVacancy>> {
    const res = await request<IPagination<IVacancy>>({
      method: 'get',
      url: '/api/vacancy/currentUser',
      data,
      config,
    })
    return res
  }

  static async fetchById(id: number): Promise<IVacancy> {
    console.log('GetV', `/api/vacancy/${id}`)
    const res = await request<IVacancy>({
      method: 'get',
      url: `/api/vacancy/${id}`,
    })
    return res
  }

  static async update(id: number, data: DeepPartial<IVacancy>): Promise<IVacancy> {
    const res = await request<IVacancy>({
      method: 'patch',
      url: `/api/vacancy/${id}`,
      data,
    })
    return res
  }

  static async create(data: DeepPartial<IVacancy>): Promise<IVacancy> {
    const res = await request<IVacancy>({
      method: 'post',
      url: '/api/vacancy',
      data,
    })
    return res
  }

  static async delete(id: number): Promise<IVacancy> {
    const res = await request<IVacancy>({
      method: 'delete',
      url: `/api/vacancy/${id}`,
    })
    return res
  }
}
