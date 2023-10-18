import request from 'utils/request'
import {ISkill} from '@/data/interfaces/ISkill'
import {DeepPartial} from '@/types/types'
import {ISkillListRequest} from '@/data/interfaces/ISkillListRequest'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {AxiosRequestConfig} from 'axios'

export default class SkillRepository {

  static async fetch(data: ISkillListRequest, config?: AxiosRequestConfig): Promise<IPagination<ISkill>> {
    const res = await request<IPagination<ISkill>>({
      url: '/api/skill',
      method: 'get',
      data,
      config,
    })
    return res
  }

  static async create(data: DeepPartial<ISkill>): Promise<ISkill> {
    const res = await request<ISkill>({
      url: '/api/skill',
      method: 'post',
      data,
    })
    return res
  }

}
