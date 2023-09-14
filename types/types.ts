import { SnackbarType } from './enums'
import { HTMLInputTypeAttribute, MouseEventHandler } from 'react'
import { FieldConfig } from 'formik'
import { UrlObject } from 'url'

export interface IButton {
  type?: 'submit' | 'reset' | 'button' | undefined
  form?: string
  spinner?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler | null
  href?: string | UrlObject | null
  isExternalHref?: boolean // add target blank and no referrer
}

export interface IField<T> extends FieldConfig<T> {
  label?: string | React.ReactNode
  placeholder?: string
  type?: HTMLInputTypeAttribute
  error?: string
  description?: string
  disabled?: boolean
}

export type Nullable<T> = T | null

export interface IOption<T> {
  label?: string
  value?: T
  disabled?: boolean
  description?: string
  name?: string
  badge?: number
}

export class RequestError extends Error {
  message: string
  code: number
  isNotFoundError: boolean

  constructor(message: string, code: number) {
    super(message)
    this.message = message
    this.code = code
    this.isNotFoundError = code === 404
  }
}

export interface SnackbarData {
  text: string
  type: SnackbarType
}



