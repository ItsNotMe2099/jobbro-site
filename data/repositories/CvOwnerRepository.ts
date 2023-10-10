import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {DeepPartial} from '@/types/types'
import {ICV} from '@/data/interfaces/ICV'
import {ICvOwnerListRequest} from '@/data/interfaces/ICvOwnerListRequest'

export default class CvOwnerRepository {
  static async fetch(data: ICvOwnerListRequest, config?: AxiosRequestConfig): Promise<IPagination<ICV>> {
    const res = await request<IPagination<ICV>>({
      method: 'get',
      url: '/api/cv/currentUser',
      data,
      config,
    })
    return res
  }

  static async fetchById(id: number): Promise<ICV> {
    const res = await request<ICV>({
      method: 'get',
      url: `/api/cv/${id}`,
    })
    return res
  }

  static async update(id: number, data: DeepPartial<ICV>): Promise<ICV> {
    const res = await request<ICV>({
      method: 'patch',
      url: `/api/cv/${id}`,
      data,
    })
    return res
  }

  static async create(data: DeepPartial<ICV>): Promise<ICV> {
    const res = await request<ICV>({
      method: 'post',
      url: '/api/cv',
      data,
    })
    return res
  }

  static async delete(id: number): Promise<ICV> {
    const res = await request<ICV>({
      method: 'delete',
      url: `/api/cv/${id}`,
    })
    return res
  }
}
