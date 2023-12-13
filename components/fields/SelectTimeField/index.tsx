import {IField, IOption} from 'types/types'
import {useMemo} from 'react'
import SelectField from 'components/fields/SelectField'
import Formatter from 'utils/formatter'

interface Props extends IField<string> {
  className?: string
}

export default function SelectTimeField(props: Props) {
  const options: IOption<string>[] = useMemo(() => {
    const data = []
    for (let hours = 0; hours < 24; ++hours) {
      for (let mins = 0; mins < 60; mins += 30) {
        const t = `${Formatter.pad('00', `${hours}`)}:${Formatter.pad('00', `${mins}`)}`
        data.push({label: t, value: t})
      }
    }
    return data
  }, [])

  return (
    <SelectField<string>
      {...props}
      options={options}
    />
  )
}
