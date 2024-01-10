import Toast from '@/components/ui/Toast'
import CloseToast from '@/components/ui/Toast/CloseToast'
import { toast } from 'react-toastify'

export interface showToastProps {
  title?: string
  text?: string
  link?: string
  linkName?: string
  icon?: JSX.Element
  progress?: number
}

export default function showToast (options: showToastProps) {
  toast(<Toast 
    title={options.title} 
    text={options.text} 
    link={options.link}
    linkName={options.linkName} 
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
    className: 'customToast'
  })  
}

