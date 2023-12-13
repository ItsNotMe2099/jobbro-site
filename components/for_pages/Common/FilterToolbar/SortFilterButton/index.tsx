import styles from './index.module.scss'
import {IOption} from '@/types/types'
import classNames from 'classnames'
import {Form, useFormik, FormikProvider} from 'formik'
import {useRef, useState} from 'react'
import {useDetectOutsideClick} from '@/components/hooks/useDetectOutsideClick'
import {usePopper} from 'react-popper'
import {MenuDropdown} from '@/components/ui/MenuDropdown'
import RadioField from '@/components/fields/RadioField'
import FilterButton from '@/components/for_pages/Common/FilterToolbar/FilterButton'

interface IFormData<T> {
  sort: T | undefined | null
}

interface Props<T> {
  value: T | undefined | null
  options: IOption<T>[]
  onChange: (value: T | undefined | null) => void
}

export default function SortFilterButton<T>(props: Props<T>) {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const {styles: popperStyles, attributes, forceUpdate, update} = usePopper(referenceElement, popperElement, {
    strategy: 'absolute',
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'computeStyles',
        options: {
          adaptive: false,
        },
      },
      {
        name: 'flip',
        enabled: false,
      },
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },

    ]
  })

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
  const handleRootRef = (ref: any) => {
    dropdownRef.current = ref
    setReferenceElement(ref)
  }


  const formik = useFormik<IFormData<T>>({
    initialValues: {sort: props.value},
    onSubmit: (data: IFormData<T>) => {
    },
  })
  return (
    <div className={styles.root}>
      <FilterButton hasValue={!!props.value} onClick={handleClick} ref={handleRootRef}>Sort</FilterButton>
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
