import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import {useField} from 'formik'
import LocationRepository from '@/data/repositories/LocationRepository'
import SelectField from '@/components/fields/SelectField'


interface Props extends IField<number> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
}

export default function CountryField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field] = useField<number>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<number>[], data: any): Promise<{ options: IOption<number>[], hasMore: boolean, additional?: any | null }> => {
    console.log('OnChangeValue2', search)
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
        value: i.geoname.geonameid
      })),
      hasMore: hasMore,
      additional: {
        page: (page ?? 0) + 1
      }
    }
  }
  return (
    <SelectField<number> {...(props as any)} async={true}
              onChange={(val) => {
                console.log('OnChangeValue5', val)
              }}
                                   placeholder={'Enter country'}  loadOptions={loadOptions} options={[]}

                                initialAsyncData={{page: 1}}/>
  )
}

