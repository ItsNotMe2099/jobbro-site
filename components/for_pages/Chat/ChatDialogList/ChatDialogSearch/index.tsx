import styles from './index.module.scss'
import React, {KeyboardEventHandler} from 'react'
import InputField, {InputValueType} from '@/components/fields/InputField'
import {Form, FormikProvider, useFormik} from 'formik'
import {Nullable} from '@/types/types'

interface Props {
  onChange: (value: Nullable<string>) => void
}

export default function ChatDialogSearch(props: Props) {
  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      //    formik.submitForm()
    }
  }
  const handleChange = (value: InputValueType<string>) => {
    props.onChange(value ?? null)
  }
  const handleSubmit = () => {

  }
  const initialValues = {}
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <InputField className={styles.input} classNameInputWrapper={styles.inputWrapper} name={'text'} placeholder={'Search'} prefix={'search'} onChange={handleChange}/>
      </Form>
    </FormikProvider>
  )

}
