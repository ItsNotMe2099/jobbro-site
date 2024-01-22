import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {DeepPartial} from '@/types/types'
import {IVacancyOwnerListRequest} from '@/data/interfaces/IVacancyOwnerListRequest'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {format, parse} from 'date-fns'
import { IVacancyFilterParams } from '../interfaces/IVacancySearchParams'

export default class VacancyRepository {
  static async fetch(data: IVacancyOwnerListRequest, config?: AxiosRequestConfig): Promise<IPagination<IVacancy>> {
    const res = await request<IPagination<IVacancy>>({
      method: 'get',
      url: '/api/vacancy/currentUser',
      data: {
        ...(data.sort ? {sort: data.sort} : {}),
        ...(data.search ? {search: data.search} : {}),
        ...(data.publishedAt ? {
          publishedAt: format(parse(data.publishedAt, 'dd.mm.yyyy', new Date()), 'yyyy-mm-dd')
        } : {}),
        s: JSON.stringify({
          ...((data.statuses?.length ?? 0) > 0 ? {
            status: {$in: data.statuses}
          } : {}),
          ...((data.projects?.length ?? 0) > 0 ? {
            projectId: {$in: data.projects?.map(i => i.id)}
          } : {}),

        })
      },
      config,
    })
    return res
  }

  static async fetchById(id: number, token?: string): Promise<IVacancy> {
    const res = await request<IVacancy>({
      method: 'get',
      url: `/api/vacancy/${id}`,
      token
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

  static async findVacancies(data: Partial<IVacancyFilterParams>): Promise<IPagination<IVacancy>|null> {
    const res = await request({
      method: 'get',
      url: '/api/vacancy',
      data: {
        sort: 'createdAt,DESC',
        ...data,
        countries: data.countries?.join(','),
        cities: data.cities?.join(','),
      }
    })
    if(res.err) {
      return null
    }
    return res
  }

  static async addVacancyToSaved(id: number): Promise<IPagination<IVacancy>|null> {
    const res = await request({
      method: 'get',
      url: `/api/vacancy/${id}/save`,      
    })
    if(res.err) {
      return null
    }
    return res
  }


  static async removeVacancyFromSaved(id: number): Promise<IPagination<IVacancy>|null> {
    const res = await request({
      method: 'get',
      url: `/api/vacancy/${id}/removeFromSaved`,      
    })
    if(res.err) {
      return null
    }
    return res
  }

  
}
