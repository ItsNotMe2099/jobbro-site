import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {DeepPartial} from '@/types/types'
import {IVacancyOwnerListRequest} from '@/data/interfaces/IVacancyOwnerListRequest'
import {IVacancy, IVacancyWithCurrentUserApply} from '@/data/interfaces/IVacancy'
import {format, parse} from 'date-fns'
import { IVacancyFilterParams } from '../interfaces/IVacancySearchParams'
import {IVacanciesByLocation} from '@/data/interfaces/IVacanciesByLocation'

export default class VacancyRepository {
  static async fetch(data: IVacancyOwnerListRequest, config?: AxiosRequestConfig): Promise<IPagination<IVacancy>> {
    const res = await request<IPagination<IVacancy>>({
      method: 'get',
      url: '/api/vacancy/currentUser',
      data: {
        ...(data.limit ? {limit: data.limit} : {}),
        ...(data.page ? {page: data.page} : {}),
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

  static async fetchById(id: number, token?: string): Promise<IVacancyWithCurrentUserApply> {
    const res = await request<IVacancyWithCurrentUserApply>({
      method: 'get',
      url: `/api/vacancy/${id}`,
      token,
      ctx
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
        ...(data.nearMeByIp ? {nearMeByIp: 'true'} : {}),
      }
    })
    if(res.err) {
      return null
    }
    return res
  }
  static async findVacanciesNearByIp(data: Partial<IVacancyFilterParams>): Promise<IVacanciesByLocation> {
    const res = await request<IVacanciesByLocation>({
      method: 'get',
      url: '/api/vacancy',
      data: {
        ...data,
        sort: 'createdAt,DESC',
        nearMeByIp: 'true'
      }
    })
    return res
  }

  static async findVacanciesCurrentDay(data: Partial<IVacancyFilterParams>): Promise<IPagination<IVacancy>> {
    const res = await request<IPagination<IVacancy>>({
      method: 'get',
      url: '/api/vacancy',
      data: {
        ...data,
        sort: 'createdAt,DESC',
        currentDay: 'true'
      }
    })

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
