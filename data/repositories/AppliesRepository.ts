import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import { IVacancyWithApply} from '@/data/interfaces/IVacancy'
import {IAppliesListRequest} from '@/data/interfaces/IAppliesListRequest'
import {ICVWithApply} from '@/data/interfaces/ICV'

export default class AppliesRepository {
  static async fetchForEmployee(data: IAppliesListRequest, config?: AxiosRequestConfig): Promise<IPagination<IVacancyWithApply>> {
    const res = await request<IPagination<IVacancyWithApply>>({
      method: 'get',
      url: '/api/vacancy',
      data: {
        withApplies: true,
        ...data,
      },
      config,
    })
    return res
  }
  static async fetchForHirer(vacancyId: number, data: IAppliesListRequest, config?: AxiosRequestConfig): Promise<IPagination<ICVWithApply>> {
    const res = await request<IPagination<ICVWithApply>>({
      method: 'get',
      url: '/api/cv/candidatesForVacancy',
      data: {
        vacancyId,
        ...data,
      },
      config,
    })
    return res
  }

}
