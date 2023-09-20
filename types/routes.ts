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
}
