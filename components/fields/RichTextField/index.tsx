import styles from './index.module.scss'
import { useField } from 'formik'
import cx from 'classnames'
import FieldError from 'components/fields/FieldError'
import { IField } from 'types/types'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { useEffect, useState } from 'react'
import { getLinkDetails, insertLink, removeLink } from './link'
import RichTextToolbar from 'components/fields/RichTextField/RichTextToolbar'
import { mdiLinkVariantOff, mdiPencil } from '@mdi/js'
import Icon from '@mdi/react'
import Formatter from 'utils/formatter'
import { Editor } from '@tiptap/core'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import { EditorView } from 'prosemirror-view'
import { EditorState } from 'prosemirror-state'
import { Placeholder } from '@tiptap/extension-placeholder'
import { useAppContext } from 'context/state'

interface IBubbleShowProps {
  editor: Editor,
  view: EditorView,
  state: EditorState,
  oldState?: EditorState,
  from: number,
  to: number
}


interface Props extends IField<string | null> {
  className?: string
}

export default function RichTextField(props: Props) {
  const { label, placeholder, className } = props
  const [field, meta, helpers] = useField(props as any)
  const { value } = field
  const [focus, setFocus] = useState(false)
  const appContext = useAppContext()
  const shouldShowBubble = ({ editor, view, state, oldState, from, to }: IBubbleShowProps) => {
    return editor.isActive('link')
  }
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4]
        },
        code: false,
        codeBlock: false,
      }),

      Underline,
      Placeholder.configure({
        emptyEditorClass: 'empty',
        placeholder: 'Введите текст',
      }),
      Link.extend({

      }).configure({
        openOnClick: false,
        autolink: false,
        HTMLAttributes: {
          target: null,
          rel: null
        }
      }),
    ],
    content: value,
    onBlur: ({ editor }) => {
      helpers.setValue(editor.getHTML())
      setFocus(false)
    },
    onFocus: () => {
      setFocus(true)
    }
  })

  const hasError = !!meta.error && meta.touched

  const handleEditLink = () => {
    const details = getLinkDetails(editor!)
  }
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [value, editor])
  if (!editor) {
    return null
  }
  return (
    <div className={cx(styles.root, className, { [styles.hasError]: hasError })}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      <div className={styles.field}>
        <BubbleMenu editor={editor!} tippyOptions={{ placement: 'bottom-start' }} shouldShow={shouldShowBubble}>
          <div className={styles.menuLinks}>
            <a href={editor!.getAttributes('link').href} target="_blank" rel="noreferrer">{Formatter.truncate(editor!.getAttributes('link').href, 40)}</a>
            <button onClick={handleEditLink}>
              <Icon path={mdiPencil}
                size={1}
                color="white" /></button>
            <button onClick={() => removeLink(editor!)}>
              <Icon path={mdiLinkVariantOff}
                size={1}
                color="white" />
            </button>
          </div>
        </BubbleMenu>
        <RichTextToolbar editor={editor} onEditLink={handleEditLink} />
        <EditorContent editor={editor} />
      </div>
      <FieldError showError={hasError}>{meta.error}</FieldError>
    </div>
  )
}
