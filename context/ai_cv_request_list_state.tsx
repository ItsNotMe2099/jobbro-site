import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IPagination} from '@/data/interfaces/IPaginationRequest'
import {IAiCvRequestListRequest} from '@/data/interfaces/IAiCvRequestListRequest'
import {IAiCvRequest} from '@/data/interfaces/IAiCvRequest'
import AiCvRequestRepository from '@/data/repositories/AiCvRequestRepository'
import {AiRequestStatusFinished} from '@/data/enum/AiRequestStatus'
import {AiCvRequestStatusFinished, AiCvRequestStatusInProgress} from '@/data/enum/AiCvRequestStatus'
import IFile from '@/data/interfaces/IFile'
import {Nullable, RequestError} from '@/types/types'
import {v4 as uuidv4} from 'uuid'
import useInterval from 'use-interval'
import {SnackbarType} from '@/types/enums'

interface IAbortControllerWithId extends AbortController {
  id?: string
}

interface IFileListItem {
  id: string
  value?: IFile,
  previewPath?: string
  previewName?: string
  previewSize?: number
  progress: number
  error?: any

}

export interface IAiCvRequestFilter extends IAiCvRequestListRequest {
}

interface IAiCvRequestWithFile {
  file?: Nullable<IFileListItem>
  request?: Nullable<IAiCvRequest>
}

interface IState {
  dataCompleted: IPagination<IAiCvRequest>
  dataInProgress: IPagination<IAiCvRequestWithFile>
  isLoadedInProgress: boolean
  isLoadedCompleted: boolean
  isLoadingInProgress: boolean
  isLoadingCompleted: boolean
  isActionLoading: boolean,
  pageInProgress: number
  setPageInProgress: (page: number) => void,
  pageCompleted: number
  setPageCompleted: (page: number) => void,
  selectedIds: string[]
  isSelectAllCompleted: boolean,
  setSelectAllCompleted: (val: boolean) => void,
  addToSelectedId: (id: string) => void
  filter: IAiCvRequestFilter
  setFilter: (data: IAiCvRequestFilter) => void
  reFetch: () => Promise<void>
  fetchMoreInProgress: () => void,
  fetchMoreCompleted: () => void,
  uploadFiles: (files: File[]) => void
  cancelFileUpload: (file: IFileListItem) => void,
  moveSelected: () => void
  deleteSelected: () => void
  moveById: (id: string) => Promise<void>
  deleteById: (id: string) => Promise<void>
}

const defaultValue: IState = {
  dataCompleted: {data: [], total: 0},
  dataInProgress: {data: [], total: 0},
  isLoadedInProgress: false,
  isLoadedCompleted: false,
  isLoadingInProgress: false,
  isLoadingCompleted: false,
  isActionLoading: false,
  pageInProgress: 1,
  setPageInProgress: (page: number) => null,
  pageCompleted: 1,
  setPageCompleted: (page: number) => null,
  selectedIds: [],
  isSelectAllCompleted: false,
  setSelectAllCompleted: (val: boolean) => null,
  addToSelectedId: (id: string) => null,
  filter: {},
  setFilter: (data: IAiCvRequestFilter) => null,
  reFetch: async () => {
  },
  fetchMoreInProgress: () => null,
  fetchMoreCompleted: () => null,
  uploadFiles: (files: File[]) => null,
  cancelFileUpload: (file: IFileListItem) => null,
  moveSelected: () => null,
  deleteSelected: () => null,
  moveById: async (id: string) => {},
  deleteById: async (id: string) => {}
}

const AiCvRequestListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function AiCvRequestListWrapper(props: Props) {
  const appContext = useAppContext()
  const [dataCompleted, setDataCompleted] = useState<IPagination<IAiCvRequest>>({data: [], total: 0})
  const [dataInProgress, setDataInProgress] = useState<IPagination<IAiCvRequestWithFile>>({data: [], total: 0})
  const [isLoadingInProgress, setIsLoadingInProgress] = useState<boolean>(false)
  const [isLoadingCompleted, setIsLoadingCompleted] = useState<boolean>(false)
  const [isLoadedInProgress, setIsLoadedInProgress] = useState<boolean>(false)
  const [isLoadedCompleted, setIsLoadedCompleted] = useState<boolean>(false)
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false)
  const [uploadingProgress, setUploadingProgress] = useState<{ [key: string]: number }>({})
  const [pageInProgress, setPageInProgress] = useState<number>(1)
  const [pageCompleted, setPageCompleted] = useState<number>(1)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isSelectAllCompleted, setSelectAllCompleted] = useState<boolean>(false)
  const [filter, setFilter] = useState<IAiCvRequestFilter>({})
  const filterRef = useRef<IAiCvRequestFilter>(filter)
  const abortInProgressControllerRef = useRef<AbortController | null>(null)
  const abortCompletedControllerRef = useRef<AbortController | null>(null)
  const abortControllersRefs = useRef<IAbortControllerWithId[]>([])
  const updateAbortController = useRef<AbortController | null>(null)
  const inProgressRef = useRef<IPagination<IAiCvRequestWithFile>>({data: [], total: 0})
  const completedRef = useRef<IPagination<IAiCvRequest>>({data: [], total: 0})
  const limit = props.limit ?? 20
  useEffect(() => {
    inProgressRef.current = dataInProgress
  }, [dataInProgress])
  useEffect(() => {
    completedRef.current = dataCompleted
  }, [dataCompleted])
  useInterval(() => {
    updateAbortController.current = new AbortController()
    const ids = inProgressRef.current?.data?.filter(i => !!i.request).map(i => i.request!.id) ?? []
    if (!ids.length) {
      return
    }
    AiCvRequestRepository.fetch({ids}).then((requests) => {
      let newDataInProgress: IPagination<IAiCvRequestWithFile> = {...inProgressRef.current}
      let newDataCompleted: IPagination<IAiCvRequest> = {...completedRef.current}
      for (const request of (requests as IAiCvRequest[])) {
        const existInProgress = newDataInProgress.data?.find(i => i?.request?.id === request.id)
        if (existInProgress) {
          if (AiRequestStatusFinished.includes(request.status)) {
            newDataInProgress = {
              data: newDataInProgress.data.filter((i) => i.request?.id !== request.id),
              total: newDataInProgress.total - 1
            }
            if (!newDataCompleted.data.find(i => i.id === request.id)) {
              newDataCompleted = {
                ...newDataCompleted,
                data: [request, ...newDataCompleted.data],
                total: newDataCompleted.total + 1
              }
            }

          } else {
            newDataInProgress = {
              ...newDataInProgress,
              data: newDataInProgress.data.map(i => i.request?.id == request.id ? ({
                ...i,
                request: {...i.request!, ...request}
              }) : i)
            }
          }
        } else {
          newDataCompleted = {
            ...newDataCompleted,
            data: newDataCompleted.data.map(i => i.id == request.id ? ({...i, ...request}) : i)
          }
        }
      }
      inProgressRef.current = newDataInProgress
      completedRef.current = newDataCompleted
      setDataInProgress(newDataInProgress)
      setDataCompleted(newDataCompleted)

    })
  }, 5000)
  useEffect(() => {
    const subscriptionUpdate = appContext.aiRequestUpdateState$.subscribe((request) => {
      const existInProgress = dataInProgress.data?.find(i => i?.request?.id === request.id)
      if (existInProgress) {
        if (AiRequestStatusFinished.includes(request.status)) {
          setDataInProgress((i) => ({
            ...i,
            data: i.data.filter((i) => i.request?.id !== request.id),
            total: i.total - 1
          }))
        } else {
          setDataInProgress(i => ({
            ...i,
            data: i.data.map(i => i.request?.id == request.id ? ({...i, request: {...i.request, ...request}}) : i)
          }))
        }
      } else {
        setDataCompleted(i => ({...i, data: i.data.map(i => i.id == request.id ? ({...i, ...request}) : i)}))
      }
    })
    const subscriptionDelete = appContext.aiRequestDeleteState$.subscribe((request) => {
      handleDelete(request.id)
    })
    return () => {
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [dataCompleted, dataInProgress])
  const handleDelete = (id: string) => {
    if(dataInProgress.data.find(i => i.request?.id === id)) {
      setDataInProgress((i) => ({...i, data: i.data.filter((i) => i.request?.id !== id), total: i.total - 1}))
    }
    if(dataCompleted.data.find(i => i?.id === id)) {
      setDataCompleted((i) => ({...i, data: i.data.filter((i) => i.id !== id), total: i.total - 1}))
    }
  }
  const fetchCompleted = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IAiCvRequest>> => {
    setIsLoadingCompleted(true)
    let res: IPagination<IAiCvRequest> = {data: [], total: 0}
    if (abortCompletedControllerRef.current) {
      abortCompletedControllerRef.current?.abort()
    }
    abortCompletedControllerRef.current = new AbortController()
    try {
      res = await AiCvRequestRepository.fetch({
        ...filterRef.current,
        limit: filterRef.current.limit ?? limit,
        statuses: AiCvRequestStatusFinished,
        page
      }, {signal: abortCompletedControllerRef.current?.signal}) as IPagination<IAiCvRequest>
      setDataCompleted(page > 1 ? (i) => ({total: res.total, data: [...i.data, ...res.data]}) : res)

    } catch (err) {
      if (err instanceof CanceledError) {
        return res
      }
    }
    setIsLoadingCompleted(false)
    setIsLoadedCompleted(true)
    return res
  }

  const fetchInProgress = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IAiCvRequest>> => {
    setIsLoadingInProgress(true)
    let res: IPagination<IAiCvRequest> = {data: [], total: 0}
    if (abortInProgressControllerRef.current) {
      abortInProgressControllerRef.current?.abort()
    }
    abortInProgressControllerRef.current = new AbortController()
    try {
      res = await AiCvRequestRepository.fetch({
        ...filterRef.current,
        statuses: AiCvRequestStatusInProgress,
        limit: filterRef.current.limit ?? limit,
        page
      }, {signal: abortInProgressControllerRef.current?.signal}) as IPagination<IAiCvRequest>
      setDataInProgress(page > 1 ? (i) => ({
        total: res.total,
        data: [...i.data, ...res.data.map(i => ({request: i}))]
      }) : {...res, data: res.data.map(i => ({request: i}))})
    } catch (err) {
      if (err instanceof CanceledError) {
        return res
      }
    }
    setIsLoadingInProgress(false)
    setIsLoadedInProgress(true)
    return res
  }

  const reFetch = async () => {
    console.log('reFetch11')
    setPageCompleted(1)
    setPageInProgress(1)
    setDataCompleted({data: [], total: 0})
    setDataInProgress({data: [], total: 0})
    setIsLoadedCompleted(false)
    setIsLoadedInProgress(false)
    await Promise.all([fetchInProgress({page: 1}), fetchCompleted({page: 1})])
  }
  const uploadFile = async (file: IFileListItem, fileToUpload: File) => {
    const abortController = new AbortController();

    (abortController as IAbortControllerWithId).id = file.id
    abortControllersRefs.current.push()
    try {
      const request = await AiCvRequestRepository.create(fileToUpload,undefined, {
        signal: abortController.signal,
        onUploadProgress: (e) => {
          const progress = e.total ? Math.round((e.loaded / e.total) * 100) : 0
          setUploadingProgress(i => ({...i, [file.id]: progress}))
        }
      })

      setDataInProgress(res => ({
        ...res, data:
          [
            ...res.data.map(i => i.file?.id === file.id ?
              ({
                request,
                file: {...i.file, progress: 100}
              }) : i)]
      }))
    } catch (e) {
      if (abortController.signal.aborted) {
        setDataInProgress((res) => ({
          total: res.data.find(i => i.file?.id === file.id && !i.request) ? res.total - 1 : res.total,
          data: res.data.filter(i => i.file?.id === file.id && !i.request)
        }))
        return
      }

      setDataInProgress(res => ({
        ...res, data:
          res.data.map(i => i.file?.id === file.id ?
            ({
              ...i,
              file: {...i.file, progress: -1, previewPath: '', error: e}
            }) : i)
      }))
    }

  }
  const uploadFiles = (acceptedFiles: File[]) => {
    const files: IFileListItem[] = []
    for (const acceptedFile of acceptedFiles) {
      const file = {
        id: uuidv4(),
        previewName: acceptedFile.name,
        previewPath: URL.createObjectURL(acceptedFiles[0]),
        previewSize: acceptedFile.size,
        progress: 0,
      }
      files.push(file)
      uploadFile(file, acceptedFile)
    }
    console.log('dsadsad', [...dataInProgress.data, ...files.map(i => ({file: i}))])
    setDataInProgress(res => ({total: res.total + 1, data: [...res.data, ...files.map(i => ({file: i}))]}))

  }
  const cancelFileUpload = (file: IFileListItem) => {
    (abortControllersRefs.current as IAbortControllerWithId[])?.find(i => i.id === file.id)?.abort()
  }
  const value: IState = {
    ...defaultValue,
    isLoadedInProgress,
    isLoadedCompleted,
    isLoadingInProgress,
    isLoadingCompleted,
    isActionLoading,
    pageInProgress,
    pageCompleted,
    selectedIds,
    setPageInProgress: (page) => {
      setPageInProgress(page)
      fetchInProgress({page})
    },
    setPageCompleted: (page) => {
      setPageCompleted(page)
      fetchCompleted({page})
    },
    dataInProgress,
    dataCompleted,
    isSelectAllCompleted,
    addToSelectedId: (id: string) => {
      if(isActionLoading){
        return
      }
      setSelectedIds(i => i.includes(id) ? i.filter(i => i !== id) : [...i, id])
    },
    filter,
    setFilter: async (data) => {
      filterRef.current = data
      setFilter(data)
      reFetch()
    },
    reFetch,
    fetchMoreInProgress: () => {
      setPageInProgress(i => i + 1)
      fetchInProgress({page: pageInProgress + 1})
    },
    fetchMoreCompleted: () => {
      setPageCompleted(i => i + 1)
      fetchCompleted({page: pageCompleted + 1})
    },
    uploadFiles,
    cancelFileUpload,
    moveSelected: async () => {
      try{
        setIsActionLoading(true)
        const res = await AiCvRequestRepository.moveToBase({ids: selectedIds, all: isSelectAllCompleted})
        if(isSelectAllCompleted){
          setDataCompleted({data: [], total: 0})
        }else{
          setDataCompleted(i => ({data: i.data.filter(i => !selectedIds.includes(i.id)), total: i.total - selectedIds.length >= 0 ? i.total - selectedIds.length : 0}))
        }
        setSelectedIds([])
      }catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
      setIsActionLoading(false)
    },
      deleteSelected: async () => {
        try{
          setIsActionLoading(true)
          const res = await AiCvRequestRepository.delete({ids: selectedIds, all: isSelectAllCompleted})
          if(isSelectAllCompleted){
            setDataCompleted({data: [], total: 0})
          }else{
            setDataCompleted(i => ({data: i.data.filter(i => !selectedIds.includes(i.id)), total: i.total - selectedIds.length >= 0 ? i.total - selectedIds.length : 0}))
          }

          setSelectedIds([])
        }catch (err) {

          if (err instanceof RequestError) {
            appContext.showSnackbar(err.message, SnackbarType.error)
          }
        }
        setIsActionLoading(false)
      },
    moveById: async (id: string) => {
      try{
        const res = await AiCvRequestRepository.moveToBase({ids: [id], all: false})
        handleDelete(id)
      }catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }

    },
    deleteById:async (id: string) => {
      try{
        const res = await AiCvRequestRepository.delete({ids: [id], all: false})
        handleDelete(id)
      }catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
    },
    setSelectAllCompleted: (val: boolean) => {
      setSelectAllCompleted(val)
    }
  }


  return (
    <AiCvRequestListContext.Provider value={value}>
      {props.children}
    </AiCvRequestListContext.Provider>
  )
}

export function useAiCvRequestListOwnerContext() {
  return useContext(AiCvRequestListContext)
}
