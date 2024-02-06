import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IStatsResponse} from '@/data/interfaces/IStats'
import {Nullable} from '@/types/types'
export default class StatsRepository {
  static async fetchStats(config?: AxiosRequestConfig): Promise<Nullable<IStatsResponse>> {
    const res = await request<IStatsResponse[]>({
      method: 'get',
      url: '/api/stats',
      config,
    })
    return res.length > 0 ? res[0] : null
  }
}
