//import styles from './index.module.scss'
import { Routes } from '@/types/routes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


export default function IndexPage() {

  const router = useRouter()

  useEffect(() => {
    router.push(Routes.lkDashboard)
  }, [])

  return (
    <></>
  )
}
