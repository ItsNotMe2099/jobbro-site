import DotsSvg from '@/components/svg/DotsSvg'
import styles from './index.module.scss'
import TryItForm from './Form'
import { useResize } from '@/components/hooks/useResize'

interface Props {

}

export default function TryIt(props: Props) {

  const { isTabletWidth, isPhoneWidth } = useResize()

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.title}>
            I want to try it
          </div>
          <div className={styles.text}>
            Leave your contacts and we will return{isPhoneWidth && <br />} to you as<br /> soon as possible
          </div>
          {!isTabletWidth && <DotsSvg className={styles.dots} />}
        </div>
        <TryItForm />
      </div>
    </div>
  )
}
