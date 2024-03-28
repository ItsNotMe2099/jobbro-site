import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import React, {/*KeyboardEventHandler*/ useRef, useState} from 'react'
import cx from 'classnames'
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
import {ChatFileUploadModalArguments} from '@/types/modal_arguments'
import useTranslation from 'next-translate/useTranslation'
import CvNoteAttachButton from '@/components/for_pages/Cv/CvForHirerPage/CvNoteCreateForm/CvNoteAttachButton'
import {useCvNoteListOwnerContext} from '@/context/cv_note_list_state'
import {ICvNoteCreateRequest} from '@/data/interfaces/ICvNoteCreateRequest'
import classNames from 'classnames'

interface Props {
  styleType: 'grey' | 'white'
}

export default function CvNoteCreateForm(props: Props) {
  const appContext = useAppContext()
  const cvNoteList = useCvNoteListOwnerContext()
  const { t } = useTranslation()
  const [sending, setSending] = useState<boolean>(false)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const {isTabletWidth} = appContext.size

  const handleSubmit = async (data: ICvNoteCreateRequest) => {
    if (!data.message?.replace(/\s+/g, ' ').trim()) {
      return
    }
    setSending(true)
    try {
      await cvNoteList.create(data)
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

  const formik = useFormik<ICvNoteCreateRequest>({
    initialValues: {
      message: ''
    },
    onSubmit: handleSubmit,
  })

  const handleNewEventClick = () => {
  //  chatContext.setRoute(ChatDialogRoute.CreateEvent, {cvId: chatContext.chat?.cvId, vacancyId: chatContext.chat?.vacancyId})
  }
  const handleFileClick = () => {
    appContext.showModal(ModalType.ChatFileUpload, {message: formik.values.message} as ChatFileUploadModalArguments)
  }
  return (
    <div>
      <FormikProvider value={formik}>
        <Form className={classNames(styles.root, [styles[props.styleType]])}>
          <div className={styles.field}>
            <CvNoteAttachButton
            disabled={sending}
            onEventClick={handleNewEventClick}
            onFileClick={handleFileClick}
            />
            <TextAreaChatField
            ref={inputRef}
            name={'message'}
            disabled={sending}
            placeholder={'Your note'}
            styleType={'message'}
            className={cx(styles.textarea)}
            />
            <IconButton
            type={'submit'}
            bgColor={isTabletWidth?'transparent':'green'}
            disabled={!formik.values.message?.replace(/\s+/g, ' ').trim() || sending}
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

