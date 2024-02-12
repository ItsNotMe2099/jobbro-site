import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {DeepPartial} from '@/types/types'
import {IIntegrationProfile} from '@/data/interfaces/IIntegrationProfile'
import {IIntegrationProfileListRequest} from '@/data/interfaces/IIntegrationProfileListRequest'
import {IPagination} from '@/data/interfaces/IPaginationRequest'

export default class IntegrationProfileOwnerRepository {
  static async fetch(data: IIntegrationProfileListRequest, config?: AxiosRequestConfig): Promise<IIntegrationProfile[]> {
    const res = await request<IPagination<IIntegrationProfile>>({
      method: 'get',
      url: '/api/owner/integration-profile',
      data,
      config,
    })
    return res.data
  }

  static async fetchById(id: number): Promise<IIntegrationProfile> {
    const res = await request<IIntegrationProfile>({
      method: 'get',
      url: `/api/owner/integration-profile/${id}`,
    })
    return res
  }

  static async update(id: number, data: DeepPartial<IIntegrationProfile>): Promise<IIntegrationProfile> {
    const res = await request<IIntegrationProfile>({
      method: 'patch',
      url: `/api/owner/integration-profile/${id}`,
      data,
    })
    return res
  }

  static async create(data: DeepPartial<IIntegrationProfile>): Promise<IIntegrationProfile> {
    const res = await request<IIntegrationProfile>({
      method: 'post',
      url: '/api/owner/integration-profile',
      data,
    })
    return res
  }

  static async delete(id: number): Promise<IIntegrationProfile> {
    const res = await request<IIntegrationProfile>({
      method: 'delete',
      url: `/api/owner/integration-profile/${id}`,
    })
    return res
  }
}
