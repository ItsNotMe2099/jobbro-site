import request from 'utils/request'
import {AxiosRequestConfig} from 'axios/index'
import {ICvEvaluationRequest} from '@/data/interfaces/ICvEvaluationRequest'
import {ICVEvaluation} from '@/data/interfaces/ICVEvaluation'
import {ICVEvaluationSimple} from '@/data/interfaces/ICVEvaluationSimple'
import {ICvEvaluationSimpleRequest} from '@/data/interfaces/ICvEvaluationSimpleRequest'

export default class CvEvaluationRepository {
  static async fetchEvaluated(data: ICvEvaluationRequest, config?: AxiosRequestConfig): Promise<ICVEvaluation[]> {
    const res = await request<ICVEvaluation[]>({
      method: 'post',
      url: '/api/cv-evaluation/evaluated',
      data,
      config,
    })
    return res
  }

  static async fetchEvaluatedSimple(data: ICvEvaluationSimpleRequest, config?: AxiosRequestConfig): Promise<ICVEvaluationSimple[]> {
    const res = await request<ICVEvaluationSimple[]>({
      method: 'post',
      url: '/api/cv-evaluation/evaluated/simple',
      data,
      config,
    })
    return res
  }

}
