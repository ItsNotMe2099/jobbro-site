import styles from './index.module.scss'

import { ReactElement } from 'react'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import { useAppContext } from '@/context/state'
import { Sticky, StickyContainer } from 'react-sticky'
interface Props {
  children?: ReactElement | ReactElement[]
}

export default function Layout(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <StickyContainer>
          <Sticky>
            {({style, distanceFromTop}) => <div className={styles.headerWrapper}  style={style}>
              <Header distanceFromTop={distanceFromTop}  />
            </div>}
          </Sticky>
        <div className={styles.container}>
          {props.children}
        </div>
        <Footer />
      </StickyContainer>


    </div>
  )
}
