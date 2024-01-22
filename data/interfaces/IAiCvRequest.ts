import {AiRequestStatus} from '@/data/enum/AiRequestStatus'
import IFile from '@/data/interfaces/IFile'
import {ICV} from '@/data/interfaces/ICV'

export interface IAiCvRequest {
  id: string;
  status: AiRequestStatus;
  lastStatusRead: AiRequestStatus;
  file: IFile;
  cv?: ICV
  vacancyId?: number
}
