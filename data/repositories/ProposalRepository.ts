import request from 'utils/request'
import {IProposal} from '@/data/interfaces/IProposal'
import {ApplyStatus} from '@/data/enum/ApplyStatus'

export default class ProposalRepository {

  static async createMulti(data: {cvId?: number, cvsIds?: number[], vacanciesIds: number[], allCandidateBase?: boolean, allAppliesToVacancy?: boolean, appliedVacancyId?: number, }): Promise<IProposal> {
    const res = await request<IProposal>({
      method: 'post',
      url: '/api/proposal/multipleCreate',
      data,
    })
    return res
  }


  static async reject(id: number): Promise<IProposal> {
    const res = await request<IProposal>({
      method: 'patch',
      url: `/api/proposal/${id}`,
      data: {status: ApplyStatus.Rejected},
    })
    return res
  }

}
