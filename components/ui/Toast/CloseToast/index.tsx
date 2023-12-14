import { CloseButtonProps } from 'react-toastify'
import styles from './index.module.scss'
import Button from '../../Button'
import CloseSvg from '@/components/svg/CloseSvg'
import { colors } from '@/styles/variables'

interface Props {
}


export default function CloseToast(props: Partial<CloseButtonProps>) {
  return (
    <Button className={styles.root} onClick={props.closeToast}>
      <CloseSvg color={colors.simpleGrey}/>
    </Button>    
  )

}