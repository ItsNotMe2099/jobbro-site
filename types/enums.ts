export enum ModalType {
  Confirm = 'confirm',
  ApplicationCreate = 'applicationCreate',
  ChatFileUpload = 'chatFileUpload',
  Gallery = 'gallery',
  CropAvatarModal = 'cropAvatarModal',
}
export enum CookiesType {
  accessToken = 'accessToken',
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
  InviteToJob = 'inviteToJob'
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
  Login = 'login',
  RegistrationHirer = 'RegistrationHirer',
  RegistrationEmployee = 'RegistrationEmployee',
  CreateJobManual = 'CreateJobManual',
  CreateJobAi = 'CreateJobAi',
  JobClose = 'JobClose',
  CreateJobAiEnterPrompt = '',
  CreateJobAiEditFilledField = '',
  MoveApplyFromApplied = '',
  MoveApplyToOffer = '',
  CandidateBaseAdd = '',
  OwnCandidateBaseAdd = '',
  HirerUploadCv = '',
  InviteToJob = '',
  // Просмотр кандидата впервые - логики записи на беке нет
  ViewCv = 'viewCv',
  CvDownloadPdf = '',
  CvComment = 'cvComment',
  OpenCvChat = 'openCvChat',
  SendChatMessageToCandidate = '',
  GetMessageFromCandidate = ''// непонятно в какой момент считать и будет необьективно

}
