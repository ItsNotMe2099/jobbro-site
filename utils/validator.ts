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
    return value || typeof value === 'number' ? undefined : 'form_field_validation_required'
  }

  static requiredName(value: string | number): string | undefined {
    return value || typeof value === 'number' ? undefined : 'form_field_validation_required_name'
  }

  static requiredEmail(value: string | number): string | undefined {
    return value || typeof value === 'number' ? undefined : 'form_field_validation_required_email'
  }

  static requiredPassword(value: string | number): string | undefined {
    return value || typeof value === 'number' ? undefined : 'form_field_validation_required_password'
  }

  static email(value: string): string | undefined {
    return value && !Validator.emailRe.test(value)
      ? 'form_field_validation_email'
      : undefined
  }

  static passwordsMustMatch = (allValues: any) => (value: string): string | undefined => {
    return value !== allValues.password ? 'form_field_validation_password_match' : undefined
  }
  static password(value: string): string | undefined {
    return value && value.length <= 6
      ? 'form_field_validation_password'
      : undefined
  }

  static phone(value: string): string | undefined{
    return Formatter.cleanPhone(value ?? '')?.length >= 12 ? undefined : 'Неверный формат'
  }

}
