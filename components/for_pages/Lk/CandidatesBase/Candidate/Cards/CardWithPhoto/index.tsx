import Card from '@/components/for_pages/Common/Card'
import styles from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import LocationSvg from '@/components/svg/LocationSvg'
import { colors } from '@/styles/variables'
import IconInCircleSvg from '@/components/svg/IconInCircleSvg'

interface Props {
  item: any //temp
}

export default function CardWithPhoto(props: Props) {

  return (
    <Card>
      <div className={styles.container}>
        <Image className={styles.avatar} src={props.item.avatar} alt='' fill />
        <div className={styles.right}>
          <div className={styles.positionAndSalary}>
            <div className={styles.position}>
              <div>{props.item.position}</div>
              <div className={styles.name}>
                {props.item.firstName} {props.item.lastName}
              </div>
            </div>
            <div className={styles.salary}>
              {props.item.salary}
            </div>
          </div>
          <div className={styles.location}>
            <div className={classNames(styles.ready, { [styles.notReady]: !props.item.readyToRelocate })}>
              {props.item.readyToRelocate ? 'Ready to relocate' : 'Not ready to relocate'}
            </div>
            <div className={styles.country}>
              <LocationSvg color={colors.textSecondary} />
              <div>{props.item.country}</div>
            </div>
          </div>
          <div className={styles.contacts}>
            <div className={styles.title}>
              Contacts
            </div>
            <div className={styles.email}>
              <IconInCircleSvg color={colors.green} circleColor='#DBF9DD' />
              <div>{props.item.email}</div>
            </div>
            <div className={styles.email}>
              <IconInCircleSvg color={colors.green} circleColor='#DBF9DD' phone />
              <div>{props.item.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
