import Image from 'next/image'
import styles from './index.module.scss'
import { ReactElement } from 'react'
import Button from '@/components/ui/Button'
import ArrowChevronRightSvg from '@/components/svg/ArrowChevronRightSvg'
import { colors } from '@/styles/variables'
import classNames from 'classnames'

interface Props {
  title: string
  text: string | ReactElement
  image: string
  btnText: string
  className?: string
}

export default function Item(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.title}>
        {props.title}
      </div>
      <div className={styles.text}>
        {props.text}
      </div>
      <Button className={styles.btn} color='transparent' styleType='small'>
        {props.btnText} <ArrowChevronRightSvg color={colors.white} />
      </Button>
      <div className={styles.bottom}>
        <Image src={props.image} alt='' fill />
      </div>
    </div>
  )
}
