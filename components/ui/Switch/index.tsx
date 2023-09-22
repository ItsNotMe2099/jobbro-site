import { colors } from '@/styles/variables'
import React from 'react'
import RSwitch from 'react-switch'

interface Props {
  checked: boolean
  onChange: (val: boolean) => void
  height?: number
  width?: number
  offColor?: string
  onColor?: string
  handleDiameter?: number
  unCheckedIcon?: boolean
  checkedIcon?: boolean
  offHandleColor?: string
  onHandleColor?: string
}

export default function Switch(props: Props) {


  return (
    <RSwitch
      onChange={props.onChange}
      checked={props.checked}
      handleDiameter={props.handleDiameter ?? 18}
      uncheckedIcon={props.unCheckedIcon ?? false}
      checkedIcon={props.checkedIcon ?? false}
      height={props.height ?? 24}
      width={props.width ?? 44}
      offColor={props.offColor ?? colors.textSecondary}
      onColor={props.onColor ?? colors.green}
      offHandleColor={props.offHandleColor ?? colors.white}
      onHandleColor={props.onHandleColor ?? colors.white}
    />
  )
}
