import React, {useRef} from 'react'
import {IField, Nullable} from '@/types/types'
import SelectField from '@/components/fields/SelectField'
import {
  ServiceCategoryListOwnerWrapper,
  useServiceCategoryListOwnerContext
} from '@/context/service_category_list_state'


interface Props extends IField<number | null> {
  resettable?: boolean
  onChange: (value: Nullable<number>) => void
  categoryId: number
  className?: string
}

const ServiceCategoryFieldInner = (props: Props) => {
  const abortControllerRef = useRef<AbortController | null>(null)
  const serviceCategoryListContext = useServiceCategoryListOwnerContext()


  return (
   <SelectField<number | null>  {...(props as any)}  options={serviceCategoryListContext.data.map(i => ({label: i.name, id: i.id}))}/>
   )
}

export default  function ServiceCategoryField(props: Props){
  return <ServiceCategoryListOwnerWrapper categoryId={props.categoryId}>
    <ServiceCategoryFieldInner {...props} />
  </ServiceCategoryListOwnerWrapper>
}
