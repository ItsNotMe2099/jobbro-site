import styles from './index.module.scss'
import {IOption} from '@/types/types'
import classNames from 'classnames'
import {Form, useFormik, FormikProvider} from 'formik'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import RadioField from '@/components/fields/RadioField'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'
import { useDropDown } from '@/components/hooks/useDropDown'

interface IFormData<T> {
  sort: T | undefined | null
}

interface Props<T> {
  value: T | undefined | null
  options: IOption<T>[]
  onChange: (value: T | undefined | null) => void
}

export default function SortFilterButton<T>(props: Props<T>) {
  const {setRootRef, isActive, setIsActive, popperStyles, setPopperElement, attributes} = useDropDown({offset: [40, 16], placement: 'bottom'})

  const handleClick = () => {
    setIsActive(!isActive)
  }
  const handleClickItem = (value: T | undefined | null) => {
    props.onChange?.(value)
    setIsActive(false)
  }

  const handleDefaultClick = () => {
    props.onChange?.(null)

    setIsActive(false)
    formik.setFieldValue('sort', null)
  }

  const formik = useFormik<IFormData<T>>({
    initialValues: {sort: props.value},
    onSubmit: (data: IFormData<T>) => {
    },
  })
  return (
    <div className={styles.root}>
      <FilterButton hasValue={!!props.value} onClick={handleClick} ref={setRootRef}>Sort</FilterButton>
      <MenuDropdown ref={setPopperElement}
                    styleType={'separator'}
                    isOpen={isActive as boolean}
                    onClick={handleClickItem}
                    className={classNames(styles.dropDown)}
                    style={popperStyles.popper}
                    {...attributes.popper} >
        <FormikProvider value={formik}>
          <Form className={styles.form}>
            <RadioField<T> name={'sort'} options={props.options} styleType='default' onChange={handleClickItem}/>
            <div onClick={handleDefaultClick} className={styles.default}>
              To Default
            </div>
          </Form>
        </FormikProvider>
      </MenuDropdown>
    </div>
  )
}
