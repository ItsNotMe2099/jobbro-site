import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import {useField} from 'formik'
import LocationRepository from '@/data/repositories/LocationRepository'
import SelectField from '@/components/fields/SelectField'
import {IGeoName} from '@/data/interfaces/ILocation'


interface Props extends IField<IGeoName> {
  resettable?: boolean
  onChange?: (value: Nullable<IGeoName>) => void
  country?: Nullable<string>
  className?: string
}

export default function CityField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field] = useField<IGeoName>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<IGeoName>[], data: any): Promise<{ options: IOption<IGeoName>[], hasMore: boolean, additional?: any | null }> => {
    console.log('loadOptionsSearch', search)
    const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }

    abortControllerRef.current = new AbortController()
    const res = await LocationRepository.fetchCities({
      limit: 5,
      page,
      country: props.country,
      ...(search ? {search} : {}),
    }, {signal: abortControllerRef.current?.signal})
    const hasMore = res.total > res.data.length + loadedOptions.length
    return {
      options: res.data.map(i => ({
        label: i.name,
        value: i
      })),
      hasMore: hasMore,
      additional: {
        page: (page ?? 0) + 1
      }
    }
  }
  return (
    <SelectField<IGeoName> {...(props as any)} async={true}
                           selectKey={`${props.country}`}
                           defaultOption={field.value ? {label: field.value?.name, value: field.value} : null}
                            loadOptions={loadOptions} options={[]}
                                initialAsyncData={{page: 1}}/>
  )
}

