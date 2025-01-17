import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import { ReactElement } from 'react'
import classNames from 'classnames'
import ArrowSvg from '@/components/svg/ArrowSvg'

interface Props {
  title: string
  right?: ReactElement | undefined | null
  link?: string
  onBack?: (() => void) | undefined
  className?: string
  invertColors?: boolean
}

/**
 * @title : string
 * @right ?: ReactElement
 * @link ?: string
 * @onBack ?: (() => void) | undefined
 * @className ?: string
 */
export default function PageTitle(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.left}>
        {props.link &&
          <Button href={props.link} className={styles.btn} icon={<ArrowSvg direction={'left'} color={colors.green} />} styleType='circle' />}
        {props.onBack &&
          <Button onClick={props.onBack} className={styles.btn } icon={<ArrowSvg direction={'left'} color={colors.green} />} styleType='circle' />}
        <div className={classNames(styles.title, props.invertColors&&styles.title_invert)}>
          {props.title}
        </div>
      </div>
      {props.right && props.right}
    </div>
  )
}
