import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {ICandidateListRequest} from '@/data/interfaces/ICandidateListRequest'
import {ICandidate} from '@/data/interfaces/ICandidate'
import {CandidateAddedStoreType} from '@/data/interfaces/CandidateAddedStoreType'
import {omit} from '@/utils/omit'

export default class CandidateRepository {
  static async fetch(data: ICandidateListRequest, config?: AxiosRequestConfig): Promise<IPagination<ICandidate>> {
    const res = await request<IPagination<ICandidate>>({
      method: 'get',
      url: '/api/owner/candidate',
      data: {
        ...omit(data, ['skills', 'profileType', 'country']),
        ...((data.skills?.length ?? 0) > 0 ? {skills: data.skills?.map(i => i.id).join(',')} : {}),
        ...((data.profileType?.length ?? 0) > 0 ? {profileType: data.profileType?.join(',')} : {}),
        ...(data.country ? {countries: [data.country]} : {}),
        ...(data.salaryType ? {salaryType: [data.salaryType]} : {})
      },
      config,
    })
    return res
  }


  static async fetchAdded(cv: number[]): Promise<CandidateAddedStoreType> {
    return request<CandidateAddedStoreType>({
      url: '/api/owner/candidate/added',
      method: 'post',
      data: {cv},
    })
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


  static async createMulti(cvIds: number[]): Promise<ICandidate> {
    const res = await request<ICandidate>({
      method: 'post',
      url: '/api/owner/candidate/bulk',
      data: {bulk: cvIds.map(cvId => ({cvId}))},
    })
    return res
  }

  static async delete(id: number): Promise<ICandidate> {
    const res = await request<ICandidate>({
      method: 'delete',
      url: `/api/owner/candidate/deleteByCv/${id}`,
    })
    return res
  }

  static async deleteMulti(ids: number[]): Promise<ICandidate> {
    const res = await request<ICandidate>({
      method: 'post',
      url: '/api/owner/candidate/deleteByCv/bulk',
      data: {
        ids,
      }
    })
    return res
  }
}
