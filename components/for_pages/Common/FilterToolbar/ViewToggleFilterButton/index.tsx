import styles from './index.module.scss'
import {colors} from '@/styles/variables'
import React from 'react'
import {CardViewType, Goal} from '@/types/enums'
import CardViewSvg from '@/components/svg/CardViewSvg'
import RowViewSvg from '@/components/svg/RowViewSvg'
import Analytics from '@/utils/goals'

interface Props {
  onChange: (view: CardViewType) => void
  view: CardViewType
}

const ViewToggleFilterButton = (props: Props) => {
  return (<div className={styles.root}>
      {props.view === CardViewType.Card ?
        <CardViewSvg onClick={() => {
          props.onChange(CardViewType.Row)
          Analytics.goal(Goal.ChangeCardViewType)
        }} color={colors.simpleGrey}/>
        :
        <RowViewSvg onClick={() => {
          props.onChange(CardViewType.Card)
          Analytics.goal(Goal.ChangeCardViewType)
        }} color={colors.simpleGrey}/>}

    </div>
  )
}
export default ViewToggleFilterButton
