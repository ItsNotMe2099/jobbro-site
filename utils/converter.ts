import { FileUploadAcceptType } from 'types/enums'
import {runtimeConfig} from '@/config/runtimeConfig'

export default class Converter {

  static convertLibphonenumberToMask = (value: string): string => value
    .replace('x', '+')
    .replaceAll('x', '0')

  static getFileUploadAccept(type: FileUploadAcceptType): {[key: string]: string[]} {
    const images = {'image/*': ['.jpeg', '.jpg', '.png']}
    const videos = {'video/mp4': ['.mp4'], 'video/mpeg': ['.mpeg'], 'video/x-msvideo': ['.avi']}
    const scans = {'application/pdf': ['.pdf']}
    const pdf = {'application/pdf': ['.pdf']}
    const docs = {
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.oasis.opendocument.text': ['.odt'],
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
      'application/rtf': ['.rtf']
    }

    const archives = {'application/vnd.rar': ['.rar'], 'application/x-7z-compressed': ['.7z'], 'application/zip': ['.zip']}
    switch (type) {
      case FileUploadAcceptType.Image:
        return images
      case FileUploadAcceptType.Scan:
        return {...images, ...scans}
      case FileUploadAcceptType.Document:
        return {...scans, ...docs}
      case FileUploadAcceptType.Media:
        return {...images, ...videos}
      case FileUploadAcceptType.Archives:
        return archives
      case FileUploadAcceptType.Pdf:
        return pdf
      default:
        return {}
    }

  }

  static getObjectDotsKeys(obj: any, prefix?: string | null): any {
    const flatMap = (a: any[], cb: (v: any, i: number) => any) => [].concat(...a.map(cb))
    if (typeof obj !== 'object') throw new Error('Invalid argument, must be an object')
    return flatMap(Object.keys(obj), (key) => {
      const value = obj[key]
      const fullKey = prefix ? `${prefix}.${key}` : key

      if (Array.isArray(value)) {
        return flatMap(value, (v: any, i: number) => {
          const arrKey = `${fullKey}[${i}]`
          if (typeof v === 'object') return this.getObjectDotsKeys(v, arrKey)
          return arrKey
        })
      }

      if (typeof value === 'object') return this.getObjectDotsKeys(value, fullKey)
      return fullKey
    })

  }
  static replaceTextImageSource(text: string): string {
    return text?.replace(/src="\/api\/asset\/(.*?)/gi, `src="${runtimeConfig.HOST}/api/asset/`)
  }

  static nameToFirstLast(name: string): { firstName: string | null, lastName: string | null } {
    const [firstName, ...lastName] = name.split(' ')

    return {firstName, lastName: lastName.join(' ')}
  }
  
  static toBase64(file: File) : Promise<string> { 
    return new Promise((resolve, reject) => {
      if(!file) reject('File not provided')
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })
  }
}
