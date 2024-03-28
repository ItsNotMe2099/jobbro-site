import { IntegrationPlatform } from '@/data/enum/IntegrationPlatform'

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

  static get findJobs() {
    return '/find-jobs'
  }

  static get search() {
    return '/find-jobs/search'
  }

  static get account() {
    return '/lk/account'
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

  static get profileResumeCreate() {
    return '/lk/profile/resume/create'
  }

  static profileResumeEdit(id: string | number) {
    return `/lk/profile/resume/edit/${id}`
  }

  static job(id: string | number) {
    return `/job/${id}`
  }

  static get lk() {
    return '/lk'
  }

  static get lkDashboard() {
    return '/lk/dashboard'
  }

  static get lkDashboardMyBoard() {
    return '/lk/dashboard/my-board'
  }

  static get lkDashboardMyBoardHiringStages() {
    return '/lk/dashboard/my-board/hiring-stages'
  }

  static get lkDashboardTeam() {
    return '/lk/dashboard/team'
  }

  static lkDashboardTeamManager(id: number) {
    return `/lk/dashboard/team/${id}`
  }

  static get lkJobs() {
    return '/lk/jobs'
  }

  static lkJob(id: string | number) {
    return `/lk/jobs/${id}`
  }
  static lkJobPipeline(id: string | number) {
    return `/lk/jobs/${id}/pipeline`
  }
  static lkJobSettings(id: string | number) {
    return `/lk/jobs/${id}/settings`
  }
  static lkJobEdit(id: string | number) {
    return `/lk/jobs/${id}/edit`
  }
  static lkJobClone(id: string | number) {
    return `/lk/jobs/${id}/clone`
  }

  static lkJobCv(id: string | number, cvId: number) {
    return `/lk/jobs/${id}/cv/${cvId}`
  }
  static get lkJobsCreateJobManually() {
    return '/lk/jobs/create-job-manually'
  }

  static get lkJobsCreateJobAi() {
    return '/lk/jobs/create-job-ai'
  }

  static get lkCandidatesBase() {
    return '/lk/candidates-base'
  }

  static lkCandidate(id: string | number) {
    return `/lk/candidates-base/${id}`
  }
  static get lkCandidateAiCvRequests() {
    return '/lk/candidates-base/ai-cv-requests'
  }
  static lkCandidateAiCvRequest(id: string | number) {
    return `/lk/candidates-base/ai-cv-requests/${id}`
  }

  static get lkHiringBoards() {
    return '/lk/hiring-boards'
  }

  static lkHiringBoard(id: string | number) {
    return `/lk/hiring-boards/${id}`
  }
  static lkHiringBoardCv(id: string | number, cvId: number) {
    return `/lk/hiring-boards/${id}/cv/${cvId}`
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

  static lkSettingsIntegrationCreate(platform?: IntegrationPlatform) {
    return `/lk/settings/integrations/create${platform ? `?platform=${platform}` : ''}`
  }
  static lkSettingsIntegrationEdit(id: number) {
    return `/lk/settings/integrations/${id}`
  }

  static get lkSettingsSocialSharing() {
    return '/lk/settings/social-sharing'
  }

  static get lkSettingsJobWidget() {
    return '/lk/settings/job-widget'
  }

  static get lkSettingsPricingPlans() {
    return '/lk/settings/pricing-plans'
  }

  static get lkSettingsPricingPlansPayment() {
    return '/lk/settings/pricing-plans-payment'
  }

  static get lkSettingsConfigWidgetSettings() {
    return '/lk/settings/job-widget/configure-widget?page=settings'
  }

  static get lkSettingsConfigWidgetDesign() {
    return '/lk/settings/job-widget/configure-widget?page=design'
  }

  static get lkSettingsConfigWidgetIncludedJobs() {
    return '/lk/settings/job-widget/configure-widget?page=included-jobs'
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

  static get lending() {
    return '/lending'
  }
  static get lkApplies() {
    return '/lk/applies'
  }

  static get marks() {
    return '/lk/marks'
  }
}
