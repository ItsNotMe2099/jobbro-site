import React, {useEffect, useRef} from 'react'
import {IField, Nullable} from '@/types/types'
import SelectField from '@/components/fields/SelectField'
import {
  ServiceCategoryListOwnerWrapper,
  useServiceCategoryListOwnerContext
} from '@/context/service_category_list_state'


interface Props extends IField<number | null> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
  categoryId?: Nullable<number>
  className?: string
}

const ServiceCategoryFieldInner = (props: Props) => {
  const abortControllerRef = useRef<AbortController | null>(null)
  const serviceCategoryListContext = useServiceCategoryListOwnerContext()
  useEffect(() => {
    serviceCategoryListContext.reFetch()
  }, [props.categoryId])

  return (
   <SelectField<number | null> isLoading={serviceCategoryListContext.isLoading}  {...(props as any)}   options={serviceCategoryListContext.data.map(i => ({label: i.name, value: i.id}))} selectKey={`${props.name}${props.categoryId ?? ''}`}/>
   )
}

export default  function ServiceCategoryField(props: Props){
  return <ServiceCategoryListOwnerWrapper categoryId={props.categoryId}>
    <ServiceCategoryFieldInner {...props} />
  </ServiceCategoryListOwnerWrapper>
}
