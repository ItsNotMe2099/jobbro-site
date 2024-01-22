import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IAiCvRequest} from '@/data/interfaces/IAiCvRequest'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IAiCvRequestListRequest} from '@/data/interfaces/IAiCvRequestListRequest'
import {omit} from '@/utils/omit'
import queryString from 'query-string'
export default class AiCvRequestRepository {
  static async fetch(data: IAiCvRequestListRequest, config?: AxiosRequestConfig): Promise<IPagination<IAiCvRequest> | IAiCvRequest[]> {
    const res = await request<IPagination<IAiCvRequest>>({
      method: 'get',
      url: '/api/ai-cv-request',
      data: {
        ...omit(data, ['statuses', 'ids']),
        ...(data.statuses?.length ? {statuses: data.statuses.join(',')} : {}),
        ...(data.ids?.length ? {ids: data.ids.join(',')} : {}),
      },
      config,
    })
    return res
  }

  static async fetchByIdIds(ids: string[], data: IAiCvRequestListRequest, config?: AxiosRequestConfig): Promise<IPagination<IAiCvRequest>> {
    const res = await request<IPagination<IAiCvRequest>>({
      method: 'get',
      url: '/api/ai-cv-request',
      data: {
        ...data,
        ids: ids.join(',')
      },
      config,
    })
    return res
  }

  static async fetchById(id: string, config?: AxiosRequestConfig): Promise<IAiCvRequest> {
    const res = await request<IAiCvRequest>({
      method: 'get',
      url: `/api/ai-cv-request/${id}`,
      config,
    })
    return res
  }

  static async create(file: File, data?: {vacancyId: number}, config?: AxiosRequestConfig): Promise<IAiCvRequest> {
    const res = await request<IAiCvRequest>({
      method: 'post',
      url: `/api/ai-cv-request?${data ? queryString.stringify(data) : ''}`,
      file,
      config
    })
    return res
  }

  static async moveToBase(data: {all: boolean, ids: string[]}): Promise<IAiCvRequest> {
    const res = await request<IAiCvRequest>({
      method: 'post',
      url: '/api/ai-cv-request/moveToBase',
      data,
    })
    return res
  }

  static async setReadLastStatus(id: string): Promise<IAiCvRequest> {
    const res = await request<IAiCvRequest>({
      method: 'post',
      url: `/api/ai-cv-request/${id}/set-read-last-status`,
     })
    return res
  }

  static async delete(data: {all: boolean, ids: string[]}): Promise<IAiCvRequest> {
    const res = await request<IAiCvRequest>({
      method: 'delete',
      url: '/api/ai-cv-request',
      data,
    })
    return res
  }
}
