import { IField, IOption } from 'types/types'
import { useField } from 'formik'
import SelectField from 'components/fields/SelectField'
import { useState } from 'react'
import request from 'utils/request'

interface Props<T> extends IField<T> {
  role?: string
}

export default function ProjecteSearchField(props: Props<string>) {
  const [field, meta, helpers] = useField(props as any)
  const [options, setOptions] = useState<IOption<string>[]>([])

  const getSearchProject = (search = '') => {
    return request({ url: '', method: 'get' })
      .then((response) => {
        const data = response.data
        setOptions(data ? data?.data?.filter((i: any) => i.slug !== null).map((item: any) => {
          return {
            label: `${item.slug}`,
            value: item.id
          }
        }) : [])
      })
  }
  const handleInputChange = (value: string) => {
    if (value) {
      getSearchProject(value)
    }
    else {
      setOptions([])
    }
  }

  return (
    <SelectField async onInputChange={handleInputChange} options={options} label={props.label} placeholder={props.placeholder} name={props.name} />
  )
}
