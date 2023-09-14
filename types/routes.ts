export class Routes {
  static getGlobal(url: string) {
    return `${typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''}${url}`
  }

  static get index() {
    return '/'
  }

  static get lk() {
    return '/lk'
  }

  static get lkDashboard() {
    return '/lk/dashboard'
  }
}
