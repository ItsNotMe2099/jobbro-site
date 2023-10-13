import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import {useField} from 'formik'
import LocationRepository from '@/data/repositories/LocationRepository'
import SelectField from '@/components/fields/SelectField'


interface Props extends IField<number> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
  countryId?: number
}

export default function CityField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field] = useField<number>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<number>[], data: any): Promise<{ options: IOption<number>[], hasMore: boolean, additional?: any | null }> => {
    console.log('loadOptionsSearch', search)
    const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }

    abortControllerRef.current = new AbortController()
    const res = await LocationRepository.fetchCities({
      limit: 5,
      page,
      country: props.countryId,
      ...(search ? {search} : {}),
    }, {signal: abortControllerRef.current?.signal})
    const hasMore = res.total > res.data.length + loadedOptions.length
    return {
      options: res.data.map(i => ({
        label: i.name,
        value: i.geonameid
      })),
      hasMore: hasMore,
      additional: {
        page: (page ?? 0) + 1
      }
    }
  }
  return (
    <SelectField<number> {...(props as any)} async={true}

                                   placeholder={'Enter city'} loadOptions={loadOptions} options={[]}
                                initialAsyncData={{page: 1}}/>
  )
}

