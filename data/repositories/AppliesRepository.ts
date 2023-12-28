import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import { IVacancyWithApply} from '@/data/interfaces/IVacancy'
import {IAppliesListRequest} from '@/data/interfaces/IAppliesListRequest'
import {ICVWithApply} from '@/data/interfaces/ICV'
import {omit} from '@/utils/omit'

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
        ...omit(data, ['skills', 'profileType', 'country']),
        ...((data.skills?.length ?? 0) > 0 ? {skills: data.skills?.map(i => i.id)?.join(',')} : {}),
        ...((data.profileType?.length ?? 0) > 0 ? {profileType: data.profileType?.join(',')} : {}),
        ...(data.country ? {countries: [data.country]} : {}),
        ...(data.salaryType ? {salaryType: [data.salaryType]} : {})
      },
      config,
    })
    return res
  }

}
