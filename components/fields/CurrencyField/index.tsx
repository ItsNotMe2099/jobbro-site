import React, {useRef} from 'react'
import {IField, Nullable} from '@/types/types'
import SelectField from '@/components/fields/SelectField'
import CurrencyUtils from '@/utils/CurrencyUtils'




interface Props extends IField<string> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
  categoryId?: number
  className?: string
}


export default  function CurrencyField(props: Props){
  const abortControllerRef = useRef<AbortController | null>(null)


  return (
    <SelectField<string>  {...(props as any)}   options={Object.keys(CurrencyUtils.getCurrenciesMap()).map(i => ({label: i, value: i}))}/>
  )
}
