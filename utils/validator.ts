import { FieldValidator } from 'formik/dist/types'
import Formatter from './formatter'

export default class Validator {
  static emailRe = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,12}$/i

  static combine(validators: FieldValidator[]): FieldValidator {
    return (value: any) => {
      for (let i = 0; i < validators.length; i++) {
        const err = validators[i](value)
        if (err) {
          return err
        }
      }
      return undefined
    }
  }

  static required(value: string | number): string | undefined {
    return value || typeof value === 'number' ? undefined : 'Обязательное поле'
  }

  static email(value: string): string | undefined {
    return value && !Validator.emailRe.test(value)
      ? 'Неверный формат'
      : undefined
  }

  static weekScheduleRequired(value: any): string | undefined {
    const keys = value ? Object.keys(value) : []
    for(const key of keys){
      if(value[key]?.active && value[key]?.startAt && value[key]?.finishAt){
        return undefined
      }
    }
    return 'Добавьте время хотя бы в 1 день'
  }

  static passwordsMustMatch = (allValues: any) => (value: string): string | undefined => {
    return value !== allValues.password ? 'Пароли не совпадают' : undefined
  }
  static password(value: string): string | undefined {
    return value && value.length <= 6
      ? 'Пароль должен быть больше 6 символов'
      : undefined
  }

  static phone(value: string): string | undefined{
    return Formatter.cleanPhone(value ?? '')?.length >= 12 ? undefined : 'Неверный формат'
  }

}
