import styles from './index.module.scss'

import { ReactElement } from 'react'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import { useAppContext } from '@/context/state'
import { Sticky, StickyContainer } from 'react-sticky'
import TabBar from '../TabBar'
import classNames from 'classnames'
interface Props {
  children?: ReactElement | ReactElement[]
  hideTabbar?: boolean
}

export default function Layout(props: Props) {
  const appContext = useAppContext()

  const {isTabletWidth} = appContext.size
  const headerDirection = appContext.headerDirection
  

  return (
    <div className={styles.root}>
      <StickyContainer>
          <Sticky>
            {({style, distanceFromTop}) => <div className={classNames(styles.headerWrapper, headerDirection === 'down'&& styles.headerHide)}  style={style}>
              <Header distanceFromTop={distanceFromTop}  />
            </div>}
          </Sticky>
        <div className={styles.container}>
          {props.children}
        </div>
        {isTabletWidth && !props.hideTabbar && appContext.aboutMe &&
        <TabBar/>
        }
        <Footer />
      </StickyContainer>
    </div>
  )
}
