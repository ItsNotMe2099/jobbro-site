// import IFile from '@/data/interfaces/IFile'
import dynamic from 'next/dynamic'
export const Avatar = dynamic(() => import('react-avatar-editor'), { ssr: false })

export interface Props {
  isBottomSheet?: boolean
  onCLose?: () => void
}

export interface ICropAvatarModalProps {
  image: string,
  onEdit: (image: string) => void
} 

