import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import ArrowLeftSvg from '@/components/svg/ArrowLeftSvg'
import { colors } from '@/styles/variables'
import { ReactElement } from 'react'
import classNames from 'classnames'

interface Props {
  title: string
  right?: ReactElement
  link?: string
  onBack?: () => void
  className?: string
}

export default function PageTitle(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.left}>
        {props.link &&
          <Button href={props.link} className={styles.btn} icon={<ArrowLeftSvg color={colors.green} />} styleType='circle' />}
        {props.onBack &&
          <Button onClick={props.onBack} className={styles.btn} icon={<ArrowLeftSvg color={colors.green} />} styleType='circle' />}
        <div className={styles.title}>
          {props.title}
        </div>
      </div>
      {props.right && props.right}
    </div>
  )
}
