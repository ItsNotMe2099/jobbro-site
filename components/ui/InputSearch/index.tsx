import { FormEvent, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useThrottleFn } from '@react-cmpt/use-throttle'
import SearchSvg from '@/components/svg/SearchSvg'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import Button from '../Button'

interface Props {
  placeholder?: string
  searchValue?: string
  hasAutocomplete?: boolean
  searchRequest: (keywords: string) => void
  className?: string
  searchIcon?: boolean
  label?: string
  onEnterClick?: (value: string) => void
}

export default function InputSearch(props: Props) {

  const [value, setValue] = useState('')

  useEffect(() => {
    if (props.searchValue && !value) {
      setValue(props.searchValue)
    }
  }, [props.searchValue])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (value) {
      props.onEnterClick ? props.onEnterClick(value) : null
    }
  }

  const handleSearch = async (value: string) => {
    if (value.length < 3 && value !== '') {
      return
    } else {
      setValue(value)
    }
    const res = await props.searchRequest(value)
  }

  const { callback: search } = useThrottleFn(handleSearch, 300)

  return (
    <div className={classNames(styles.root, { [styles.correct]: value })}>
      {props.label && value &&
        <div className={styles.innerLabel}>
          <div className={styles.label}>
            {props.label}
          </div>
        </div>
      }
      <form className={classNames(styles.form, props.className)} action="/search" onSubmit={handleSubmit}>
        <input
          name="query"
          type="text"
          value={value}
          autoComplete={'off'}
          className={classNames({ [styles.withVal]: value })}
          onChange={(e) => {
            const value = e.currentTarget.value
            setValue(value)
            search(value)
          }}
          placeholder={props.placeholder}
        />
        {props.searchIcon && <SearchSvg className={styles.btn} color={colors.textSecondary} />}
      </form>
      {!props.searchIcon && value && <Button onClick={() => props.onEnterClick ? props.onEnterClick(value) : null}
        className={styles.enter}
        styleType='small' color='transparent'>Press Enter</Button>}
    </div>
  )
}
