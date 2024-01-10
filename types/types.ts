import { SnackbarType } from './enums'
import {HTMLInputTypeAttribute, MouseEventHandler, ReactElement} from 'react'
import { FieldConfig } from 'formik'
import { UrlObject } from 'url'
import IChatMessage from '@/data/interfaces/IChatMessage'

export type FieldIconName = 'field_phone' | 'field_name' | 'field_comment' | 'field_date' | 'field_time' | 'field_persons' | 'field_email'

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
  label?: string | ReactElement | undefined
  placeholder?: string
  type?: HTMLInputTypeAttribute
  error?: string
  description?: string| JSX.Element
  disabled?: boolean
  iconName?: FieldIconName
}

export type Nullable<T> = T | null

export interface IOptionGroup<T> {
  title?: string
  options: IOption<T>[]
}
export interface IOption<T> {
  label?: string|JSX.Element
  value?: T
  disabled?: boolean
  description?: string
  name?: string
  badge?: number
  href?: string
  color?: string
}

export type RadioStyleType = 'default' | 'tile' | 'row'

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

export const CONTACTS = {
  twitter: '#',
  instagram: '#',
  facebook: '#',
  linkedIn: '#',
  youtube: '#',
  adress: '12140 Jl H Nawi Raya 9-A, Dki Jakarta, Indonesia',
  phone: '518-564-3200',
  email: 'contact@jobbro.com',
}

export interface IRichTextLinkData {
  title: string | null,
  href: string | null
}


export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export interface ChatMessageProps{
  message: IChatMessage
  side: 'my' | 'other' | undefined | null
}

export interface IFormStep<S> {
  name?: string,
  description?: string | null
  key: S
}
