import Toast from '@/components/ui/Toast'
import CloseToast from '@/components/ui/Toast/CloseToast'
import { toast, ToastOptions } from 'react-toastify'
import {MouseEventHandler} from 'react'

export interface showToastProps {
  title?: string
  text?: string
  link?: string
  linkName?: string
  linkOnClick?: MouseEventHandler
  icon?: JSX.Element
  progress?: number
}

export default function showToast<T>(options: showToastProps, toastProps?: ToastOptions) {
  return toast<T>(<Toast
    title={options.title}
    text={options.text}
    link={options.link}
    linkName={options.linkName}
    linkOnClick={options.linkOnClick}
    icon={options.icon}
    />,
    {
    position: 'top-right',
    hideProgressBar: true,
    pauseOnHover: true,
    closeOnClick: false,
    draggable: false,
    type: 'default',
    icon: false,
    progress: undefined,
    closeButton: <CloseToast/>,
    className: 'customToast',
      ...(toastProps ? toastProps : {}),
  })
}

