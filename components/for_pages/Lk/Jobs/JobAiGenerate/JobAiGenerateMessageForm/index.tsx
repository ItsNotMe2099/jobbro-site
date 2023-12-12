import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react'
import cx from 'classnames'
import {RequestError} from 'types/types'
import { SnackbarType} from 'types/enums'
import {useAppContext} from 'context/state'
import TextAreaChatField from '@/components/fields/TextAreaChatField'
import IconButton from '@/components/ui/IconButton'
import {colors} from '@/styles/variables'
import SendSvg from '@/components/svg/SendSvg'
import {IChatMessageCreateRequest} from '@/data/interfaces/IChatMessageCreateRequest'
import {useVacancyGenerateAiContext} from '@/context/vacancy_generate_ai'
import {AiRequestStatus} from '@/data/enum/AiRequestStatus'

interface Props {
}

export default function JobAiGenerateMessageForm() {
  const appContext = useAppContext()
  const vacancyGenerateAiContext =useVacancyGenerateAiContext()
  const [sending, setSending] = useState<boolean>(false)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const handleSubmit = async (data: IChatMessageCreateRequest) => {
    if (!data.message?.replace(/\s+/g, ' ').trim()) {
      return
    }
    setSending(true)
    try {
      await vacancyGenerateAiContext.create(data.message!)

      setTimeout(() => {
        inputRef.current?.focus()
      }, 200)


    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setSending(false)
  }
  useEffect(() => {
    const subscriptionUpdate = vacancyGenerateAiContext.requestUpdateState$.subscribe((request) => {
      if(request.status === AiRequestStatus.Finished){
        formik.resetForm({
          values: {
            message: '',
          },
        })
      }
    })
    return () => {
      subscriptionUpdate.unsubscribe()
    }
  }, [])
  const formik = useFormik<IChatMessageCreateRequest>({
    initialValues: {
      message: ''
    },

    onSubmit: handleSubmit,
  })
  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      formik.submitForm()
    }
  }
  return (
      <FormikProvider value={formik}>
        <Form className={styles.root}>
          <div className={styles.field}>
            <TextAreaChatField
              ref={inputRef}
              name={'message'}
              disabled={vacancyGenerateAiContext.sending || vacancyGenerateAiContext.loading}
              placeholder={'Сообщение'}
              styleType={'message'}
              onKeyDown={handleKeyDown}
              className={cx(styles.textarea)}
            />
            <IconButton type={'submit'} bgColor={'green'}
                        disabled={ !formik.values.message?.replace(/\s+/g, ' ').trim() || sending} spinner={vacancyGenerateAiContext.sending || vacancyGenerateAiContext.loading}>
              <SendSvg color={colors.white}/>
            </IconButton>
          </div>
        </Form>
      </FormikProvider>
  )

}
