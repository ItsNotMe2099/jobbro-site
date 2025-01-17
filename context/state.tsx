import {CookiesType, ModalType, SidePanelType, SnackbarType} from '@/types/enums'
import {Nullable, RequestError, SnackbarData} from '@/types/types'
import {Dispatch, SetStateAction, createContext, useContext, useEffect, useState} from 'react'
import IAboutMe from '@/data/interfaces/IAboutMe'
import {Subject} from 'rxjs'
import AuthRepository from '@/data/repositories/AuthRepository'
import {getIsMobile} from '@/utils/mobile'
import {CookiesLifeTime} from '@/types/constants'
import Cookies from 'js-cookie'
import ReactModal from 'react-modal'
import {IManager} from '@/data/interfaces/IManager'
import {IOffice} from '@/data/interfaces/IOffice'
import {ICompany} from '@/data/interfaces/ICompany'
import {ICV, ICVWithApply} from '@/data/interfaces/ICV'
import {IVacancy} from '@/data/interfaces/IVacancy'
import {ICandidate} from '@/data/interfaces/ICandidate'
import IEvent from '@/data/interfaces/IEvent'
import {IAiCvRequest} from '@/data/interfaces/IAiCvRequest'
import { IResizeValues, useResize } from '@/components/hooks/useResize'
import {IApplication} from '@/data/interfaces/IApplication'
import {IIntegrationProfile} from '@/data/interfaces/IIntegrationProfile'
import ICvNote from '@/data/interfaces/ICvNote'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  isLogged: boolean
  isNotLogged: boolean
  aboutMeLoaded: boolean
  allLoaded: boolean
  snackbar: SnackbarData | null
  showSnackbar: (text: string, type: SnackbarType) => void
  modal: ModalType | null
  modalArguments: any
  modalNonSkippable: boolean
  setModalNonSkippable: (val: boolean) => void
  bottomSheet: ModalType | null
  showModal: <T extends unknown>(type: ModalType, args?: T) => void
  hideModal: () => void
  showBottomSheetOnTop: <T extends unknown>(type: ModalType, args?: T) => void
  hideBottomSheetOnTop: () => void
  bottomSheetOnTop: ModalType | null
  bottomSheetOnTopArguments: any
  showBottomSheet: <T extends unknown>(type: ModalType, args?: T) => void,
  hideBottomSheet: () => void
  sidePanel: SidePanelType | null
  panelArguments: any
  showSidePanel: (type: SidePanelType, args?: any) => void
  hidePanel: () => void
  fileUploadingState$: Subject<boolean>
  setIsFilesUploading: (value: boolean) => void
  isFilesUploading: boolean
  aboutMe: IAboutMe | null,
  logout: () => void,
  token: string | null
  setToken: (token: string) => void
  updateAboutMe: (newUser?: IAboutMe) => Promise<IAboutMe | null>
  loginState$: Subject<boolean>
  aboutMeState$: Subject<Nullable<IAboutMe>>
  isOverlayShown?: boolean
  showOverlay: () => void
  hideOverlay: () => void

  headerDirection: 'up'|'down'
  setDirection: Dispatch<SetStateAction<'up' | 'down'>>



  vacancyCreateState$: Subject<IVacancy>,
  vacancyUpdateState$: Subject<IVacancy>,
  vacancyDeleteState$: Subject<IVacancy>,

  cvCreateState$: Subject<ICV>,
  cvUpdateState$: Subject<ICV>,
  cvDeleteState$: Subject<ICV>,

  applicationCreateState$: Subject<IApplication>,
  cvApplyUpdateState$: Subject<ICVWithApply>,
  cvApplyDeleteState$: Subject<ICVWithApply>,

  aiRequestCreateState$: Subject<IAiCvRequest>,
  aiRequestUpdateState$: Subject<IAiCvRequest>,
  aiRequestDeleteState$: Subject<IAiCvRequest>,

  companyCreateState$: Subject<ICompany>,
  companyUpdateState$: Subject<ICompany>,
  companyDeleteState$: Subject<ICompany>,

  officeCreateState$: Subject<IOffice>,
  officeUpdateState$: Subject<IOffice>,
  officeDeleteState$: Subject<IOffice>

  managerCreateState$: Subject<IManager>,
  managerUpdateState$: Subject<IManager>,
  managerDeleteState$: Subject<IManager>

  candidateCreateState$: Subject<ICandidate>,
  candidateUpdateState$: Subject<ICandidate>,
  candidateDeleteState$: Subject<ICandidate>,


  eventCreateState$: Subject<IEvent>,
  eventUpdateState$: Subject<IEvent>,

  integrationCreateState$: Subject<IIntegrationProfile>,
  integrationUpdateState$: Subject<IIntegrationProfile>,
  integrationDeleteState$: Subject<IIntegrationProfile>

  cvNoteCreateState$: Subject<ICvNote>,
  cvNoteUpdateState$: Subject<ICvNote>,
  cvNoteDeleteState$: Subject<ICvNote>

  size: IResizeValues
}

const fileUploadingState$ = new Subject<boolean>()
const loginState$ = new Subject<boolean>()
const aboutMeState$ = new Subject<Nullable<IAboutMe>>()

const vacancyCreateState$ = new Subject<IVacancy>()
const vacancyUpdateState$ = new Subject<IVacancy>()
const vacancyDeleteState$ = new Subject<IVacancy>()

const cvCreateState$ = new Subject<ICV>()
const cvUpdateState$ = new Subject<ICV>()
const cvDeleteState$ = new Subject<ICV>()

const applicationCreateState$ = new Subject<IApplication>()
const cvApplyUpdateState$ = new Subject<ICVWithApply>()
const cvApplyDeleteState$ = new Subject<ICVWithApply>()

const aiRequestCreateState$ = new Subject<IAiCvRequest>()
const aiRequestUpdateState$ = new Subject<IAiCvRequest>()
const aiRequestDeleteState$ = new Subject<IAiCvRequest>()

const companyCreateState$ = new Subject<ICompany>()
const companyUpdateState$ = new Subject<ICompany>()
const companyDeleteState$ = new Subject<ICompany>()

const officeCreateState$ = new Subject<IOffice>()
const officeUpdateState$ = new Subject<IOffice>()
const officeDeleteState$ = new Subject<IOffice>()

const managerCreateState$ = new Subject<IManager>()
const managerUpdateState$ = new Subject<IManager>()
const managerDeleteState$ = new Subject<IManager>()

const candidateCreateState$ = new Subject<ICandidate>()
const candidateUpdateState$ = new Subject<ICandidate>()
const candidateDeleteState$ = new Subject<ICandidate>()

const eventCreateState$ = new Subject<IEvent>()
const eventUpdateState$ = new Subject<IEvent>()

const integrationCreateState$ = new Subject<IIntegrationProfile>()
const integrationUpdateState$ = new Subject<IIntegrationProfile>()
const integrationDeleteState$ = new Subject<IIntegrationProfile>()

const cvNoteCreateState$ = new Subject<ICvNote>()
const cvNoteUpdateState$ = new Subject<ICvNote>()
const cvNoteDeleteState$ = new Subject<ICvNote>()

const defaultValue: IState = {
  isMobile: false,
  isLogged: false,
  isNotLogged: true,
  aboutMeLoaded: false,
  allLoaded: false,
  isDesktop: true,
  snackbar: null,
  showSnackbar: (text, type) => null,
  modal: null,
  modalArguments: null,
  modalNonSkippable: false,
  setModalNonSkippable: () => null,
  bottomSheet: null,
  showModal: (type) => null,
  showBottomSheet: (type) => null,
  hideModal: () => null,
  hideBottomSheet: () => null,
  bottomSheetOnTop: null,
  bottomSheetOnTopArguments: null,
  showBottomSheetOnTop: (type) => null,
  hideBottomSheetOnTop: () => null,
  sidePanel: null,
  panelArguments: null,
  showSidePanel: (type, args) => null,
  hidePanel: () => null,
  setIsFilesUploading: (value) => null,
  isFilesUploading: false,
  fileUploadingState$,
  aboutMe: null,
  logout: () => null,
  token: null,
  setToken: (token: string) => null,
  updateAboutMe: async () => null,
  loginState$: loginState$,
  aboutMeState$,
  isOverlayShown: false,
  showOverlay: () => null,
  hideOverlay: () => null,

  headerDirection: 'up',
  setDirection: () => null,

  size: {},



  vacancyCreateState$,
  vacancyUpdateState$,
  vacancyDeleteState$,

  cvCreateState$,
  cvUpdateState$,
  cvDeleteState$,

  applicationCreateState$,
  cvApplyUpdateState$,
  cvApplyDeleteState$,

  aiRequestCreateState$,
  aiRequestUpdateState$,
  aiRequestDeleteState$,

  companyCreateState$,
  companyUpdateState$,
  companyDeleteState$,

  officeCreateState$,
  officeUpdateState$,
  officeDeleteState$,

  managerCreateState$,
  managerUpdateState$,
  managerDeleteState$,

  candidateCreateState$,
  candidateUpdateState$,
  candidateDeleteState$,

  eventCreateState$,
  eventUpdateState$,

  integrationCreateState$,
  integrationUpdateState$,
  integrationDeleteState$,

  cvNoteCreateState$,
  cvNoteUpdateState$,
  cvNoteDeleteState$,

}

const ModalsBottomSheet: ModalType[] = [

]


const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string
  language?: string
}

export function AppWrapper(props: Props) {
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const [token, setToken] = useState<string | null>(props.token ?? null)
  const [aboutMe, setAboutMe] = useState<IAboutMe | null>(null)
  const [aboutMeLoaded, setAboutMeLoaded] = useState<boolean>(false)
  const [isLogged, setIsLogged] = useState<boolean>(!!props.token)
  const [allLoaded, setAllLoaded] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(props.isMobile)
  const [sidePanel, setSidePanel] = useState<SidePanelType | null>(null)
  const [panelArguments, setPanelArguments] = useState<any>(null)
  const [isFilesUploading, setIsFilesUploading] = useState<boolean>(false)
  const [modal, setModal] = useState<ModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any>(null)
  const [isOverlayShown, setIsOverlayShown] = useState<boolean>(false)
  const [bottomSheet, setBottomSheet] = useState<ModalType | null>(null)
  const [modalNonSkippable, setModalNonSkippable] = useState<boolean>(false)
  const [bottomSheetOnTop, setBottomSheetOnTop] = useState<ModalType | null>(null)
  const [bottomSheetOnTopArguments, setBottomSheetOnTopArguments] = useState<any>(null)

  const [headerDirection, setDirection] = useState<'up'|'down'>('up')
  const size = useResize()

  const showSnackbar = (text: string, type: SnackbarType) => {

    setSnackbar({text, type})
    setTimeout(() => {
      setSnackbar(null)
    }, 2000)
  }

  useEffect(() => {
    if (props.token) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [props.token])

  useEffect(() => {
    const promises = []

    if (props.token) {
      promises.push(
        updateAboutMe().catch(() => {
          setIsLogged(false)
        }),
      )
    } else {
      setAboutMeLoaded(true)
    }

    Promise.all(promises).then((i) => setTimeout(() => setAllLoaded(true), 1))

  }, [])

  const showSidePanel = (type: SidePanelType, args?: any) => {
    setPanelArguments(args)
    setSidePanel(type)
  }

  const hidePanel = () => {
    setSidePanel(null)
    setPanelArguments(null)
  }

  const updateAboutMe = async (updatedUser?: IAboutMe) => {
    let newUser: IAboutMe | null = null
    if (updatedUser) {
      newUser = updatedUser
      setAboutMe(updatedUser)
      setAboutMeLoaded(true)
    } else {
      try {
        newUser = await AuthRepository.fetchAboutMe()
        if (newUser) {
          setAboutMe(newUser)
          aboutMeState$.next(newUser)
        }

      } catch (err) {
        if (err instanceof RequestError) {
          showSnackbar(err.message, SnackbarType.error)
        }
      }
      setAboutMeLoaded(true)
    }
    return newUser
  }

  useEffect(() => {
    setIsMobile(getIsMobile(props.isMobile))
  }, [])


  const showModal = <T extends unknown>(type: ModalType, args?: T) => {
    if (props.isMobile && ModalsBottomSheet.includes(type)) {
      showBottomSheet(type, args)
      return
    }

    ReactModal.setAppElement('body')
    setModalArguments(args)
    setModal(type)
    if (bottomSheet) {
      hideBottomSheet()
    }
  }

  const hideModal = () => {
    if (bottomSheet) {
      hideBottomSheet()
    }
    setModal(null)
    setModalArguments(null)
  }

  const showBottomSheet = <T extends unknown>(type: ModalType, props?: T) => {
    ReactModal.setAppElement('body')
    setModalArguments(props)
    setBottomSheet(type)
  }

  const hideBottomSheet = () => {
    setBottomSheet(null)
  }


  const showBottomSheetOnTop = (type: ModalType, args?: any) => {
    ReactModal.setAppElement('body')
    setBottomSheetOnTopArguments(args)
    setBottomSheetOnTop(type)
  }

  const hideBottomSheetOnTop = () => {
    setBottomSheetOnTop(null)
    setBottomSheetOnTopArguments(null)
  }

  const value: IState = {
    ...defaultValue,
    modalNonSkippable,
    setModalNonSkippable,
    isLogged,
    isNotLogged: !isLogged,
    isMobile: isMobile,
    isDesktop: !props.isMobile,
    snackbar,
    showSnackbar,
    aboutMeLoaded,
    allLoaded,
    aboutMe,
    updateAboutMe,
    token,
    modal,
    modalArguments,
    bottomSheet,
    showModal,
    showBottomSheet,
    hideModal,
    hideBottomSheet,
    sidePanel,
    panelArguments,
    showSidePanel,
    hidePanel,
    isFilesUploading,
    isOverlayShown,
    headerDirection,
    setDirection,
    size,
    showBottomSheetOnTop,
    bottomSheetOnTop,
    bottomSheetOnTopArguments,
    hideBottomSheetOnTop,
     showOverlay: () => {
      setIsOverlayShown(true)
    },
    hideOverlay: () => {
      setIsOverlayShown(false)
    },
    setIsFilesUploading: (value) => {
      setIsFilesUploading(value)
      fileUploadingState$.next(value)
    },
    setToken: (token: string) => {
      Cookies.set(CookiesType.accessToken, token, {
        expires: CookiesLifeTime.accessToken,
      })
      setToken(token)
      setIsLogged(true)
      loginState$.next(true)

    },
    logout: () => {
      Cookies.remove(CookiesType.accessToken)
      setIsLogged(false)
      setAboutMe(null)

      loginState$.next(false)
      aboutMeState$.next(null)
    },
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
