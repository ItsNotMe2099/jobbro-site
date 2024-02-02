import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import React, {/*KeyboardEventHandler*/ useRef, useState} from 'react'
import cx from 'classnames'
import {ChatDialogRoute, useChatDialogContext} from 'context/chat_dialog_state'
import {RequestError} from 'types/types'
import {ModalType, SnackbarType} from 'types/enums'
import {useAppContext} from 'context/state'
import TextAreaChatField from '@/components/fields/TextAreaChatField'
import IconButton from '@/components/ui/IconButton'
import {colors} from '@/styles/variables'
import SendSvg from '@/components/svg/SendSvg'
import Modal from '@/components/ui/Modal'
import {ChatFileUploadModal} from '@/components/modals/ChatFileUploadModal'
import {RemoveScroll} from 'react-remove-scroll'
import {IChatMessageCreateRequest} from '@/data/interfaces/IChatMessageCreateRequest'
import ChatMessageAttachButton from '@/components/for_pages/Chat/ChatMessageForm/ChatMessageAttachButton'
import {ChatFileUploadModalArguments} from '@/types/modal_arguments'
import useTranslation from 'next-translate/useTranslation'

interface Props {
}

export default function ChatMessageForm() {
  const appContext = useAppContext()
  const chatContext = useChatDialogContext()
  const { t } = useTranslation()
  const [sending, setSending] = useState<boolean>(false)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const {isTabletWidth} = appContext.size

  const handleSubmit = async (data: IChatMessageCreateRequest) => {
    if (!data.message?.replace(/\s+/g, ' ').trim()) {
      return
    }
    setSending(true)
    try {
      await chatContext.sendMessage(data)
      formik.resetForm({
        values: {
          message: '',
        },
      })
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

  const formik = useFormik<IChatMessageCreateRequest>({
    initialValues: {
      message: ''
    },
    onSubmit: handleSubmit,
  })

  const handleNewEventClick = () => {
    chatContext.setRoute(ChatDialogRoute.CreateEvent, {cvId: chatContext.chat?.cvId, vacancyId: chatContext.chat?.vacancyId})
  }
  const handleFileClick = () => {
    appContext.showModal(ModalType.ChatFileUpload, {message: formik.values.message} as ChatFileUploadModalArguments)
  }
  return (
    <div>
      <FormikProvider value={formik}>
        <Form className={styles.root}>
          <div className={styles.field}>
            <ChatMessageAttachButton 
            disabled={chatContext.disabled} 
            onEventClick={handleNewEventClick} 
            onFileClick={handleFileClick} 
            />
            <TextAreaChatField
            ref={inputRef}
            name={'message'}
            disabled={chatContext.disabled || sending}
            placeholder={t('chat_message_form_placeholder')}
            styleType={'message'}
            className={cx(styles.textarea)}
            />
            <IconButton 
            type={'submit'} 
            bgColor={isTabletWidth?'transparent':'green'}
            disabled={chatContext.disabled || !formik.values.message?.replace(/\s+/g, ' ').trim() || sending} 
            spinner={sending}
            >
              <SendSvg color={isTabletWidth?colors.green:colors.white}/>
            </IconButton>
          </div>
        </Form>
      </FormikProvider>
      <RemoveScroll enabled={appContext.modal === ModalType.ChatFileUpload}>
        <div aria-hidden="true">
          <Modal isOpen={appContext.modal === ModalType.ChatFileUpload} onRequestClose={appContext.hideModal}>
            {appContext.modal === ModalType.ChatFileUpload && <ChatFileUploadModal/>}
          </Modal>
        </div>
      </RemoveScroll>
    </div>
  )

}

