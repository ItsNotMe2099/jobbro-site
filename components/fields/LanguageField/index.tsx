import React from 'react'
import {IField, Nullable} from '@/types/types'
import SelectField from '@/components/fields/SelectField'
import LanguageUtils from '@/utils/LanguageUtils'

interface Props extends IField<string> {
  resettable?: boolean
  onChange?: (value: Nullable<string>) => void
  className?: string
  
}

export default function LanguageField(props: Props) {
  
  return (
    <SelectField<string> {...props} options={LanguageUtils.getLanguageList().sort((a, b) => {
      if(a.label && b.label) {
        return a.label > b.label ? 1 : -1
      }
      else {
        return 0
      }
    })} />
  )
}

