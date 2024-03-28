import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export default interface ICvNoteListRequest extends IPaginationRequest{
  cvId: number
}
