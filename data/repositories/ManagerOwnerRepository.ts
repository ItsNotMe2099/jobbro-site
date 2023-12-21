import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IManager} from '@/data/interfaces/IManager'
import {DeepPartial} from '@/types/types'
import {IManagerCreateRequest} from '@/data/interfaces/IManagerCreateRequest'
import {IManagerListRequest} from '@/data/interfaces/IManagerListRequest'

export default class ManagerOwnerRepository {
  static async fetch(data: IManagerListRequest, config?: AxiosRequestConfig): Promise<IPagination<IManager>> {
    const res = await request<IPagination<IManager>>({
      method: 'get',
      url: '/api/manager',
      data,
      config,
    })
    return res
  }

  static async fetchById(id: string | number): Promise<IManager> {
    const res = await request<IManager>({
      method: 'get',
      url: `/api/manager/${id}`,
    })
    return res
  }

  static async update(id: string, data: DeepPartial<IManagerCreateRequest>): Promise<IManager> {
    const res = await request<IManager>({
      method: 'patch',
      url: `/api/manager/${id}`,
      data,
    })
    return res
  }

  static async create(data: DeepPartial<IManagerCreateRequest>): Promise<IManager> {
    const res = await request<IManager>({
      method: 'post',
      url: '/api/manager',
      data,
    })
    return res
  }

  static async delete(id: string): Promise<IManager> {
    const res = await request<IManager>({
      method: 'delete',
      url: `/api/manager/${id}`,
    })
    return res
  }
}
