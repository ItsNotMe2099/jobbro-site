import {formatRelative} from 'date-fns'
import {ru} from 'date-fns/locale'

const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const pluralizeNative = require('numeralize-ru').pluralize

export default class Formatter {
  static pluralize(number: number, word1: string, word2: string, word3: string) {
    return pluralizeNative(number, word1, word2, word3)
  }

  static cleanPhone(phone: string) {
    if (phone) {
      let phoneCleaned = `${phone}`.replace(/[^\+0-9]/g, '')
      if (!phoneCleaned.startsWith('+')) {
        phoneCleaned = '+' + phoneCleaned
      }
      return phoneCleaned
    }
    return phone
  }

  static formatDateUntil(date: string | Date) {
    const formatRelativeLocale: { [key: string]: string } = {
      'yesterday': 'Вчера до HH:mm',
      'today': 'до HH:mm',
      'tomorrow': 'Завтра до HH:mm',
      'other': 'до dd.MM.yyyy HH:mm', // Difference: Add time to the date
    }

    const locale = {
      ...ru,
      formatRelative: (token: string) =>
        formatRelativeLocale[token] || formatRelativeLocale['other'],
    }
    if (!date) {
      return ''
    }
    return formatRelative(typeof date === 'string' ? new Date(date) : date, new Date(), {locale})
  }

  static formatDateRelative(date: string | Date) {
    const formatRelativeLocale: { [key: string]: string } = {
      'yesterday': 'Вчера HH:mm',
      'today': 'Сегодня HH:mm',
      'tomorrow': 'Завтра до HH:mm',
      'other': 'dd MMMM yyyy HH:mm'
    }

    const locale = {
      ...ru,
      formatRelative: (token: string) =>
        formatRelativeLocale[token] || formatRelativeLocale['other'],
    }
    if (!date) {
      return ''
    }
    return formatRelative(typeof date === 'string' ? new Date(date) : date, new Date(), {locale})
  }

  static formatPhone(phone: string | null) {
    try {
      if(!phone){
        return
      }
      const number = phoneUtil.parseAndKeepRawInput(this.cleanPhone(`${phone}`), 'RU')
      return phoneUtil.format(number, PNF.INTERNATIONAL)
    } catch (e) {
      return phone
    }
  }

  static pad(pad: string, str: string, padLeft = true) {
    if (typeof str === 'undefined')
      return pad
    if (padLeft) {
      return (pad + str).slice(-pad.length)
    } else {
      return (str + pad).substring(0, pad.length)
    }
  }

  static formatNumber(num: number, separator?: string) {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
  }


  static formatPrice(price?: number, suffix?: string): string {
    if (!price) {
      return ''
    }
    return `${this.formatNumber(Math.ceil(price))} ${suffix ?? '₽'}`
  }
  static formatDeliveryPrice(price?: number): string {
    if (!price) {
      return ''
    }
    return this.formatPrice(price, '₽/т')
  }

  static formatTimeString(time: string) {
    if(!time){
      return ''
    }
  const parts = time.split(':')

    return `${parts[0]}:${parts[1]}`
  }


  static formatSize(bytes: number | undefined){
    const sufixes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes ?? 0) / Math.log(1024))
    return !bytes && '' || ((bytes ?? 0) / Math.pow(1024, i)).toFixed(2) + ' ' + sufixes[i]
  };
}

export const pad = Formatter.pad
