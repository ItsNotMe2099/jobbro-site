import DotsSvg from '@/components/svg/DotsSvg'
import styles from './index.module.scss'
import TryItForm from './Form'

interface Props {

}

export default function TryIt(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.title}>
            I want to try it
          </div>
          <div className={styles.text}>
            Leave your contacts and we will return to you as<br /> soon as possible
          </div>
          <DotsSvg className={styles.dots} />
        </div>
        <TryItForm />
      </div>
    </div>
  )
}
