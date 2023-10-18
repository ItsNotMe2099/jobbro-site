import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import {useField} from 'formik'
import LocationRepository from '@/data/repositories/LocationRepository'
import SelectField from '@/components/fields/SelectField'
import {IGeoName} from '@/data/interfaces/ILocation'


interface Props extends IField<IGeoName> {
  resettable?: boolean
  onChange?: (value: Nullable<IGeoName>) => void
  className?: string
}

export default function CountryField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field] = useField<IGeoName>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<IGeoName>[], data: any): Promise<{ options: IOption<IGeoName>[], hasMore: boolean, additional?: any | null }> => {
    const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }

    abortControllerRef.current = new AbortController()
    const res = await LocationRepository.fetchCountries({
      limit: 5,
      page,
      ...(search ? {search} : {}),
    }, {signal: abortControllerRef.current?.signal})
    const hasMore = res.total > res.data.length + loadedOptions.length
    return {
      options: res.data.map(i => ({
        label: i.name,
        value: i.geoname
      })),
      hasMore: hasMore,
      additional: {
        page: (page ?? 0) + 1
      }
    }
  }
  return (
    <SelectField<IGeoName> {...(props as any)} async={true}
              onChange={(val) => {
                console.log('OnChangeValue5', val)
              }}
                           defaultOption={field.value ? {label: field.value?.name, value: field.value} : null}
                                   placeholder={'Enter country'}  loadOptions={loadOptions} options={[]}

                                initialAsyncData={{page: 1}}/>
  )
}

