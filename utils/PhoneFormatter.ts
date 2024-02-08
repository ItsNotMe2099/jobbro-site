const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

export default class PhoneFormatter {
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
  static formatPhone(phone: string | null) {
    try {
      if (!phone) {
        return
      }
      const number = phoneUtil.parseAndKeepRawInput(this.cleanPhone(`${phone}`), 'RU')
      return phoneUtil.format(number, PNF.INTERNATIONAL)
    } catch (e) {
      return phone
    }
  }


}
