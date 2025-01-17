import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {DeepPartial} from '@/types/types'
import {IOffice} from '@/data/interfaces/IOffice'
import {IOfficeListRequest} from '@/data/interfaces/IOfficeListRequest'
import {omit} from '@/utils/omit'

export default class OfficeOwnerRepository {
  static async fetch(data: IOfficeListRequest, config?: AxiosRequestConfig): Promise<IPagination<IOffice>> {
    const res = await request<IPagination<IOffice>>({
      method: 'get',
      url: '/api/owner/office',
      data: {
        ...omit(data, ['isDefault']),
      ...(data.isDefault ? {isDefault: '1'} : {})
      },
      config,
    })
    return res
  }

  static async fetchById(id: number): Promise<IOffice> {
    const res = await request<IOffice>({
      method: 'get',
      url: `/api/owner/office/${id}`,
    })
    return res
  }

  static async update(id: number, data: DeepPartial<IOffice>): Promise<IOffice> {
    const res = await request<IOffice>({
      method: 'patch',
      url: `/api/owner/office/${id}`,
      data,
    })
    return res
  }

  static async create(data: DeepPartial<IOffice>): Promise<IOffice> {
    const res = await request<IOffice>({
      method: 'post',
      url: '/api/owner/office',
      data,
    })
    return res
  }

  static async delete(id: number): Promise<IOffice> {
    const res = await request<IOffice>({
      method: 'delete',
      url: `/api/owner/office/${id}`,
    })
    return res
  }
}
