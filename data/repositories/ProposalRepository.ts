import request from 'utils/request'
import {IProposal} from '@/data/interfaces/IProposal'
import {ProposalStatus} from '@/data/enum/ProposalStatus'

export default class ProposalRepository {

  static async create(data: {vacancyId: number, cvId: number}): Promise<IProposal> {
    const res = await request<IProposal>({
      method: 'post',
      url: '/api/proposal',
      data,
    })
    return res
  }

  static async reject(id: number): Promise<IProposal> {
    const res = await request<IProposal>({
      method: 'patch',
      url: `/api/proposal/${id}`,
      data: {status: ProposalStatus.Rejected},
    })
    return res
  }

}
