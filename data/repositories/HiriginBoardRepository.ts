import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {IVacancyWithHiringStages} from '@/data/interfaces/IVacancy'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IHiringBoardListRequest} from '@/data/interfaces/IHiringBoardListRequest'
import {format, parse} from 'date-fns'

export default class HiringBoardRepository {
  static async fetch(data: IHiringBoardListRequest, config?: AxiosRequestConfig): Promise<IPagination<IVacancyWithHiringStages>> {
    const res = await request<IPagination<IVacancyWithHiringStages>>({
      method: 'get',
      url: '/api/hiring-board',
      data: {
        ...(data.sort ? {sort: data.sort} : {}),
        ...(data.search ? {search: data.search} : {}),
        ...(data.publishedAt ? {
          publishedAt: format(parse(data.publishedAt, 'dd.mm.yyyy', new Date()), 'yyyy-mm-dd')
        } : {}),
        s: JSON.stringify({
          ...((data.statuses?.length ?? 0) > 0 ? {
            status: {$in: data.statuses}
          } : {}),
          ...((data.projects?.length ?? 0) > 0 ? {
            projectId: {$in: data.projects?.map(i => i.id)}
          } : {}),

        })
      },
      config,
    })
    return res
  }
  static async fetchByVacancyId(vacancyId: number, config?: AxiosRequestConfig): Promise<IPagination<IVacancyWithHiringStages>> {
    const res = await request<IPagination<IVacancyWithHiringStages>>({
      method: 'get',
      url: '/api/hiring-board',
      config,
      data: {
        s: JSON.stringify({id: vacancyId})
      }
    })
    return res
  }

  static async moveToStage(data: {applicationId?: number, proposalId?: number, hiringStageId: number}): Promise<null> {
    const res = await request<null>({
      method: 'post',
      url: '/api/hiring-board/moveToStage',
      data,
    })
    return res
  }

}
