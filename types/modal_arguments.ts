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
