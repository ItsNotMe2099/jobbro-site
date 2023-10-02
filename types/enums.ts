export enum CookiesType {
  accessToken = 'accessToken',
}

export enum FileUploadAcceptType {
  Image = 'image',
  Video = 'video',
  Document = 'document',
  Scan = 'scan',
  Media = 'media',
  Archives = 'archives'
}

export enum InputStyleType {
  Default = 'default',
  Password = 'password'
}

export enum SidePanelType {
  
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