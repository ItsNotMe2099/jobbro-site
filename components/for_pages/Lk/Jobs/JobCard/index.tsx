import PersonSvg from '@/components/svg/PersonSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import MenuSvg from '@/components/svg/MenuSvg'
import Link from 'next/link'
import { Routes } from '@/types/routes'
import MenuDropdown from './MenuDropdown'
import { useState } from 'react'

interface Props {
  item: any //temp
  className?: string
  view: 'row' | 'card'
}

export default function JobCard(props: Props) {

  const getColor = (status: string) => {
    switch (status) {
      case 'draft':
        return colors.blue
      case 'published':
        return colors.grey
      case 'pause':
        return colors.lightOrange
    }
  }

  const getColorStatus = (status: string) => {
    switch (status) {
      case 'draft':
        return colors.darkBlue
      case 'published':
        return colors.green
      case 'pause':
        return colors.darkOrange
    }
  }

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const options = [
    { label: 'Publish' },
    { label: 'Pause' },
    { label: 'Close' },
  ]

  const operations = [
    { label: 'Edit' },
    { label: 'Duplicate' },
    { label: 'Delete' },
  ]

  return (
    <div className={classNames(styles.root, props.className, { [styles.row]: props.view === 'row' })}>
      <Link href={Routes.lkJob(props.item.id)} className={classNames(styles.container, { [styles.rowContainer]: props.view === 'row' })}
        style={{ backgroundColor: getColor(props.item.status) }}>
        <div className={styles.wrapper}>
          {props.view !== 'row' && <div className={styles.top}>
            <div className={styles.publish}>
              <div className={styles.published}>
                Publish Date:
              </div>
              <div className={styles.date}>
                {props.item.published}
              </div>
            </div>
            <div className={styles.employees}>
              <PersonSvg color={colors.textSecondary} />
              <div className={styles.quantity}>
                {props.item.employees}
              </div>
            </div>
          </div>}
          <div className={styles.middle}>
            <div className={styles.published}>
              Market
            </div>
            <div className={styles.name}>
              {props.item.name}
            </div>
          </div>
          {props.view === 'row' && <div className={styles.status} style={{ color: getColorStatus(props.item.status) }}>
            {props.item.status}
          </div>}
        </div>
        {props.view === 'row' &&
          <div className={styles.rowBottom}>
            <div className={styles.left}>
              <div className={styles.salary}>
                {props.item.salary}
              </div>
              <div className={styles.country}>
                {props.item.country}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.employees}>
                <PersonSvg color={colors.textSecondary} />
                <div className={styles.quantity}>
                  {props.item.employees}
                </div>
              </div>
              <div className={styles.publish}>
                <div className={styles.published}>
                  Publish Date:
                </div>
                <div className={styles.date}>
                  {props.item.published}
                </div>
              </div>
            </div>
          </div>}
        {props.view !== 'row' && <div className={styles.status} style={{ color: getColorStatus(props.item.status) }}>
          {props.item.status}
        </div>}
      </Link>
      <div className={styles.bottom}>
        {props.view !== 'row' && <div className={styles.left}>
          <div className={styles.salary}>
            {props.item.salary}
          </div>
          <div className={styles.country}>
            {props.item.country}
          </div>
        </div>}
        <MenuSvg onClick={() => setShowMenu(!showMenu)} className={styles.menu} color={colors.textPrimary} />
        {showMenu && <MenuDropdown className={styles.drop} options={options} operations={operations} />}
      </div>
    </div>
  )
}
