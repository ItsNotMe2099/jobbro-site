import IFile from '@/data/interfaces/IFile'

export interface ConfirmModalArguments {
  onConfirm: () => void
  onCancel?: () => void
  title?: string
  text?: string
  confirm?: string,
  cancel?: string
  confirmColor?: 'red' | 'blue'
}

export interface ApplicationCreateModalArguments{
  vacancyId: number
}
export interface ChatFileUploadModalArguments {
  message?: string | null
}

export interface GalleryModalArguments {
  images: IFile[]
  title: string
  selectedId: number
}


