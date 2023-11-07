import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {ICandidateListRequest} from '@/data/interfaces/ICandidateListRequest'
import {ICandidate} from '@/data/interfaces/ICandidate'

export default class CandidateRepository {
  static async fetch(data: ICandidateListRequest, config?: AxiosRequestConfig): Promise<IPagination<ICandidate>> {
    const res = await request<IPagination<ICandidate>>({
      method: 'get',
      url: '/api/owner/candidate',
      data,
      config,
    })
    return res
  }

  static async fetchById(id: number, config?: AxiosRequestConfig): Promise<ICandidate> {
    const res = await request<ICandidate>({
      method: 'get',
      url: `/api/owner/candidate/${id}`,
      config,
    })
    return res
  }


  static async create(cvId: number): Promise<ICandidate> {
    const res = await request<ICandidate>({
      method: 'post',
      url: '/api/owner/candidate',
      data: {cvId},
    })
    return res
  }

  static async delete(id: number): Promise<ICandidate> {
    const res = await request<ICandidate>({
      method: 'delete',
      url: `/api/owner/candidate/${id}`,
    })
    return res
  }
}
