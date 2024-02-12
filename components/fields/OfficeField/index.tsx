import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import {useField} from 'formik'
import SelectField from '@/components/fields/SelectField'
import OfficeOwnerRepository from '@/data/repositories/OfficeOwnerRepository'
import {IOffice} from '@/data/interfaces/IOffice'


interface Props extends IField<IOffice> {
  resettable?: boolean
  onChange?: (value: Nullable<IOffice>) => void
  className?: string
}

export default function OfficeField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)
  const [field, meta, helpers] = useField<IOffice>(props as any)
  const loadOptions = async (search: string, loadedOptions: IOption<IOffice>[], data: any): Promise<{ options: IOption<IOffice>[], hasMore: boolean, additional?: any | null }> => {
    const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }

    abortControllerRef.current = new AbortController()
    const res = await OfficeOwnerRepository.fetch({
      limit: 100,
      page,
      ...(search ? {search} : {}),
    }, {signal: abortControllerRef.current?.signal})

    const hasMore = res.total > res.data.length + loadedOptions.length
    return {
      options: res.data.map(i => ({
        label: i.name ?? '',
        value: i
      })),
      hasMore: hasMore,
      additional: {
        page: (page ?? 0) + 1
      }
    }
  }
  return (
    <SelectField<IOffice> {...(props as any)} async={true}
                           defaultOption={field.value ? {label: field.value?.name ?? '', value: field.value} : null}
                          loadOptions={loadOptions} options={[]}
                         initialAsyncData={{page: 1}}/>
  )
}

