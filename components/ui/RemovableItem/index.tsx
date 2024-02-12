import CloseSvg from '@/components/svg/CloseSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'

interface Props {
  text: string
  onClick?: ()=> void
}

export default function RemovableItem(props: Props) {

  return (<p className={styles.item}>
    <span>{props.text}</span> <CloseSvg color={colors.simpleGrey} className={styles.crossSvg} onClick={props.onClick}/>
  </p>)
}