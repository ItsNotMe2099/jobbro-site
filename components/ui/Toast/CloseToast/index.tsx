import { CloseButtonProps } from 'react-toastify'
import styles from './index.module.scss'
import Button from '../../Button'
import CloseSvg from '@/components/svg/CloseSvg'
import { colors } from '@/styles/variables'
import {MouseEventHandler} from 'react'

interface Props {
  onClickCustom?: () => void
}


export default function CloseToast(props: Partial<CloseButtonProps> & Props) {
  const handleClick: MouseEventHandler = (e) => {
    props.onClickCustom?.()
    props.closeToast?.(e as any)
  }
  return (
    <Button className={styles.root} onClick={handleClick}>
      <CloseSvg color={colors.simpleGrey}/>
    </Button>
  )

}
