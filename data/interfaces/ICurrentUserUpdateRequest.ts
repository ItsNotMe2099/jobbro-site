import IFile from '@/data/interfaces/IFile'

export interface ICurrentUserUpdateRequest {
  firstName?: string | null,
  lastName?: string | null
  patronymic?: string | null
  position?: string | null,
  image?: IFile | null,
  professionalLink?: string | null
}
