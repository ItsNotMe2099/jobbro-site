export class Routes {
  static getGlobal(url: string) {
    return `${typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''}${url}`
  }

  static get index() {
    return '/'
  }

  static get login() {
    return '/login'
  }

  static get registration() {
    return '/registration'
  }

  static get forgotPassword() {
    return '/forgot-password'
  }

  static get resetPassword() {
    return '/reset-password'
  }

  static get lk() {
    return '/lk'
  }

  static get lkDashboard() {
    return '/lk/dashboard'
  }
}
