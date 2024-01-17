export enum ModalType {
  Confirm = 'confirm',
  ApplicationCreate = 'applicationCreate',
  ChatFileUpload = 'chatFileUpload',
  Gallery = 'gallery',
  CropAvatarModal = 'cropAvatarModal',
  ApplyForJobModal = 'applyForJobModal',
}
export enum CookiesType {
  accessToken = 'accessToken',
  language = 'language',
}

export enum FileUploadAcceptType {
  Image = 'image',
  Video = 'video',
  Document = 'document',
  Scan = 'scan',
  Media = 'media',
  Archives = 'archives',
  Pdf = 'pdf'
}

export enum InputStyleType {
  Default = 'default',
  Password = 'password'
}


export enum SnackbarType {
  error,
  success,
}

export enum Preset {
  /** 200px */
  xsResize,
  /** 200px */
  xsCrop,

  /** 600px */
  smResize,
  /** 600px */
  smCrop,

  /** 900px */
  mdResize,
  /** 900px */
  mdCrop,

  /** 1200px */
  lgResize,
  /** 1200px */
  lgCrop,

  /** 1800px */
  xlResize,
  /** 1800px */
  xlCrop,
}
export enum Languages {
  en ='en',
  de ='de',
  fr ='fr',
  cs ='cs',
  nl ='nl',
  et ='et',
  pt ='pt',
  it ='it',
  ja ='ja',
  ko ='ko',
  lv ='lv',
  es ='es',
  uk ='uk',
  zh ='zh',
  ru ='ru',
}

export enum SidePanelType {
  JobsFilter = 'jobsFilter',
  JobReview = 'jobReview',
  InviteToJob = 'inviteToJob',
  CandidateBaseFilter = 'candidateBaseFilter',
  JobAppliesFilter = 'jobAppliesFilter',
}

export enum CardViewType {
  Card = 'card',
  Row = 'row'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum Goal {
  Login = 'auth:login',
  RegistrationHirer = 'auth:registration:hirer',
  RegistrationEmployee = 'auth:registration:employee',
  CreateJobManual = 'job:manual:create',
  CreateJobAi = 'job:ai:create',
  JobClose = 'job:close',
  CreateJobAiEnterPrompt = 'job:ai:enter-prompt',
  CreateJobAiEditFilledField = 'job:ai:edit-filled-field',
  MoveApplyFromApplied = 'apply:move:from-applied',
  MoveApplyToOffer = 'apply:move:to-offer',
  CandidateBaseAdd = 'candidate-base:add',
  CvRequestAddToBase = 'cv-request:add-to-base',
  CvRequestUpload = 'cv-request:upload',
  JobInviteCv = 'job:invite-cv',

  // Просмотр кандидата впервые - логики записи на беке нет
  ViewCv = 'cv:view',
  ViewCvOnce = 'cv:view:once',
  CvDownloadPdf = 'cv:download-pdf',
  CvComment = 'cv:comment',
  OpenCvChat = 'chat:cv:open',
  SendChatMessageToCandidate = 'chat:message:send-to-candidate',
  GetMessageFromCandidate = 'chat:message:get-from-candidate',// непонятно в какой момент считать и будет необьективно
  DashboardTeamView = 'dashboard:team:view',
  DashboardManagerView = 'dashboard:manager:view',
  DashboardMyView = 'dashboard:my:view',
  DashboardHiringBoardsSeeAll = 'dashboard:hiring-boards:see-all',
  ChangeCardViewType = 'card-view-type:change',
  JobFeedbackCreate = 'job:feedback:create'
}
