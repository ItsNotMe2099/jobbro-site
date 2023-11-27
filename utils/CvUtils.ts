import { ICVWithApply} from '@/data/interfaces/ICV'
import {IProposal} from '@/data/interfaces/IProposal'
import {IApplication} from '@/data/interfaces/IApplication'
import {Nullable} from '@/types/types'

export default class CvUtils {
  static getProposalOrApplicationFromCv(cv: Nullable<ICVWithApply>): IProposal | IApplication | null{
    if(!cv){
      return null
    }
    return cv.proposals?.length > 0 ? cv.proposals[0] : cv.applications?.length > 0 ? cv.applications[0] : null
  }

}
