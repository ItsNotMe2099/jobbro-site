import styles from './index.module.scss'
import classNames from 'classnames'
import Checkbox from '@/components/ui/Checkbox'
import MarkdownText from '@/components/ui/MarkdownText'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import {ReactElement} from 'react'


interface Props {
  checked: boolean
  showError?: boolean
  label: string | ReactElement | undefined
  onClick: () => void
}

export default function CheckboxWithLabel(props: Props) {
  const [ref, press, hover] = usePressAndHover()
  return (  <div className={styles.root} onClick={props.onClick} >
    <Checkbox checked={props.checked} hover={hover} showError={props.showError ?? false}/>
    <div
      className={classNames({
        [styles.label]: true,
        [styles.error]: props.showError,
      })}
    >
      {(props.label && typeof props.label === 'string') ? <MarkdownText>{props.label as string}</MarkdownText> : props.label}
    </div>
  </div>)
}

