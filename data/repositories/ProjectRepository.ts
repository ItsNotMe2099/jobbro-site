import request from 'utils/request'
import {IProject} from '@/data/interfaces/IProject'
import {DeepPartial} from '@/types/types'
import {IProjectListRequest} from '@/data/interfaces/IProjectListRequest'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {AxiosRequestConfig} from 'axios'

export default class ProjectRepository {

  static async fetch(data: IProjectListRequest, config?: AxiosRequestConfig): Promise<IPagination<IProject>> {
    const res = await request<IPagination<IProject>>({
      url: '/api/project',
      method: 'get',
      data,
      config,
    })
    return res
  }

  static async create(data: DeepPartial<IProject>): Promise<IProject> {
    const res = await request<IProject>({
      url: '/api/project',
      method: 'post',
      data,
    })
    return res
  }

}
