import styles from './index.module.scss'
import {useAppContext} from 'context/state'

import ModalLayout from '@/components/layout/Modal/ModalLayout'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import ModalBody from '@/components/layout/Modal/ModalBody'
import {useChatDialogContext} from '@/context/chat_dialog_state'
import React, {KeyboardEventHandler, useRef, useState} from 'react'
import {Nullable, RequestError} from '@/types/types'
import {FileUploadAcceptType, SnackbarType} from '@/types/enums'
import {Form, FormikProvider, useFormik} from 'formik'
import TextAreaChatField from '@/components/fields/TextAreaChatField'
import cx from 'classnames'
import IconButton from '@/components/ui/IconButton'
import SendSvg from '@/components/svg/SendSvg'
import {colors} from '@/styles/variables'
import FileListField from '@/components/fields/Files/FileListField'
import IFile from '@/data/interfaces/IFile'
import ModalFooter from '@/components/layout/Modal/ModalFooter'
import {ChatFileUploadModalArguments} from '@/types/modal_arguments'

interface IFormData{
  message: Nullable<string>
  assets: IFile[]
}
interface Props{
  isBottomSheet?: boolean
}
export function ChatFileUploadModal(props: Props) {
  const appContext = useAppContext()
  const chatContext = useChatDialogContext()
  const args = appContext.modalArguments as ChatFileUploadModalArguments
  const [sending, setSending] = useState<boolean>(false)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const handleSubmit = async (data: IFormData) => {
    if(!data.message?.replace(/\s+/g, ' ').trim() && data.assets.length === 0){
      return
    }
    setSending(true)
    try {
      await chatContext.sendMessage({message: data.message ?? null, assets: data.assets, assetsIds: data.assets.map(i => i.id)})
      formik.resetForm({
        values: {
          message: '',
          assets: []
        },
      })
    appContext.hideModal()

    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setSending(false)
  }

  const formik = useFormik<IFormData>({
    initialValues: {
      message: args.message ?? null,
      assets: []
    },

    onSubmit: handleSubmit,
  })
  const handleKeyDown: KeyboardEventHandler = (e)=>{
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      formik.submitForm()
    }
  }

  return (
    <FormikProvider value={formik}>
    <ModalLayout size={'small'} fixed>
      <ModalHeader/>
          <Form className={styles.root}>
            <ModalBody className={styles.modalBody} fixed>
            <FileListField
              name='assets'
              accept={[FileUploadAcceptType.Image, FileUploadAcceptType.Document, FileUploadAcceptType.Archives]}
            />
            </ModalBody>
            <ModalFooter className={styles.footer}>
              <TextAreaChatField
                ref={inputRef}
                name={'message'}
                disabled={sending}
                placeholder={'Сообщение'}
                styleType={'message'}
                onKeyDown={handleKeyDown}
                className={cx(styles.textarea)}
              />
              <IconButton type={'submit'} bgColor={'green'} disabled={(!formik.values.message?.replace(/\s+/g, ' ').trim() && formik.values.assets.length === 0) || sending} spinner={sending || appContext.isFilesUploading}>
                <SendSvg color={colors.white}/>
              </IconButton>
            </ModalFooter>

          </Form>
    </ModalLayout>
  </FormikProvider>

  )
}
