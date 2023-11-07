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

  static get profile() {
    return '/lk/profile'
  }

  static get profileSettings() {
    return '/lk/profile/settings'
  }

  static get profileResume() {
    return '/lk/profile/resume'
  }

  static profileResumeEdit(id: string | number) {
    return `/lk/profile/resume/edit/${id}`
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

  static lkJob(id: string | number) {
    return `/lk/jobs/${id}`
  }
  static lkJobEdit(id: string | number) {
    return `/lk/jobs/${id}/edit`
  }

  static get lkJobsCreateJobManually() {
    return '/lk/jobs/create-job-manually'
  }

  static get lkCandidatesBase() {
    return '/lk/candidates-base'
  }

  static lkCandidate(id: string | number) {
    return `/lk/candidates-base/${id}`
  }

  static get lkHiringBoards() {
    return '/lk/hiring-boards'
  }

  static lkHiringBoard(id: string | number) {
    return `/lk/hiring-boards/${id}`
  }

  static get lkScorecardsTemplates() {
    return '/lk/scorecard-templates'
  }

  static get lkSettings() {
    return '/lk/settings'
  }

  static get lkSettingsPayments() {
    return '/lk/settings/payments'
  }

  static get lkSettingsPaymentsMethod() {
    return '/lk/settings/payments/method'
  }

  static get lkSettingsReferrals() {
    return '/lk/settings/referrals'
  }

  static get lkSettingsIntegrations() {
    return '/lk/settings/integrations'
  }

  static get lkSettingsSocialSharing() {
    return '/lk/settings/social-sharing'
  }

  static get lkSettingsJobWidget() {
    return '/lk/settings/job-widget'
  }

  static get lkSettingsConfigWidgetSettings() {
    return '/lk/settings/job-widget/configure-widget/settings'
  }

  static get lkSettingsConfigWidgetDesign() {
    return '/lk/settings/job-widget/configure-widget/design'
  }

  static get lkSettingsConfigWidgetIncludedJobs() {
    return '/lk/settings/job-widget/configure-widget/included-jobs'
  }

  static get lkSettingsConfigWidget() {
    return '/lk/settings/job-widget/configure-widget'
  }

  static get lkCompany() {
    return '/lk/company'
  }
  static get lkCompanyDetails() {
    return '/lk/company/details'
  }

  static get lkCompanyCareer() {
    return '/lk/company/career'
  }

  static get lkCompanyOffices() {
    return '/lk/company/offices'
  }

  static lkCompanyOffice(id: number) {
    return `/lk/company/offices/${id}`
  }
  static get lkCompanyOfficeCreate() {
    return '/lk/company/offices/new'
  }

  static get lkCompanyTeam() {
    return '/lk/company/team'
  }

  static get chat() {
    return '/chat'
  }

  static chatId(id: number) {
    return `/chat/${id}`
  }

  static get chatAll() {
    return '/chat/all'
  }

  static get chatInvites() {
    return '/chat/invites'
  }

  static get chatRequirementsAnswer() {
    return '/chat/requirements-answer'
  }
}
