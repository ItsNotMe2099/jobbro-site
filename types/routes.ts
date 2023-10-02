export class Routes {
  static getGlobal(url: string) {
    return `${typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''}${url}`
  }

  static login(redirect?: string) {
    return `/auth/login${redirect ? `?redirect=${redirect}` : ''}`
  }

  static registration(redirect?: string) {
    return `/auth/registration${redirect ? `?redirect=${redirect}` : ''}`
  }

  static get passwordForgot() {
    return '/auth/password-forgot'
  }
  static passwordReset(data: { login: string, code?: string }) {
    return `/auth/password-reset?login=${data.login}${data.code ? `&code=${data.code}` : ''}`
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

  static get lkJobs() {
    return '/lk/jobs'
  }

  static get lkJobsCreateJobManually() {
    return '/lk/jobs/create-job-manually'
  }

  static get lkCandidateBase() {
    return '/lk/candidate-base'
  }

  static get lkHiringBoards() {
    return '/lk/hiring-boards'
  }

  static get lkScorecardsTemplates() {
    return '/lk/scorecard-templates'
  }

  static get lkSettings() {
    return '/lk/settings'
  }

  static get lkYourCompany() {
    return '/lk/your-company'
  }

  static get lkYourCompanyEdit() {
    return '/lk/your-company/edit'
  }
}
